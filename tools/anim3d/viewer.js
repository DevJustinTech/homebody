// Headless renderer for the 3D exercise clips.
//
// The page exposes window.anim3d, which tools/anim3d/render.mjs drives frame by
// frame through a headless Chromium (Brave). Nothing here ships to the app: it
// only bakes WebP loops from the CC0 rig.
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const params = new URLSearchParams(location.search)
const W = Number(params.get('w') || 800)
const H = Number(params.get('h') || 600)

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
  powerPreference: 'high-performance',
})
renderer.setPixelRatio(1)
renderer.setSize(W, H)
renderer.setClearColor(0x000000, 0)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.NoToneMapping
renderer.shadowMap.enabled = false
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.05, 80)

// Flat, soft studio light. The figure is a single ink-coloured mesh; all form
// comes from shading, so the key sits high and slightly camera-left.
const hemi = new THREE.HemisphereLight(0xffffff, 0x8e8a7e, 1.15)
scene.add(hemi)

const key = new THREE.DirectionalLight(0xffffff, 2.1)
key.position.set(-3.5, 6, 4.5)
scene.add(key)

const fill = new THREE.DirectionalLight(0xffffff, 0.75)
fill.position.set(4.5, 2.5, 2.5)
scene.add(fill)

const rim = new THREE.DirectionalLight(0xffffff, 1.35)
rim.position.set(1, 3.5, -6)
scene.add(rim)

const INK = 0x35342e
const PAPER_INK = 0xcfcbbf

// Four-step ramp: the figure reads as ink bands rather than smooth game
// shading, which sits much closer to the app's print aesthetic.
const ramp = new THREE.DataTexture(new Uint8Array([46, 92, 150, 210, 255]), 5, 1, THREE.RedFormat)
ramp.minFilter = THREE.NearestFilter
ramp.magFilter = THREE.NearestFilter
ramp.generateMipmaps = false
ramp.needsUpdate = true

const ink = new THREE.MeshToonMaterial({ color: INK, gradientMap: ramp })

// Inverted hull, drawn with the body's own skeleton. OutlineEffect cannot
// skin (it renders the bind pose), so the offset lives in a cloned material.
const hullMat = ink.clone()
hullMat.side = THREE.BackSide
hullMat.color.set(0x141412)

hullMat.onBeforeCompile = shader => {
  shader.vertexShader = shader.vertexShader.replace(
    '#include <project_vertex>',
    [
      'vec4 mvPosition = vec4( transformed, 1.0 );',
      '#ifdef USE_BATCHING',
      '  mvPosition = batchingMatrix * mvPosition;',
      '#endif',
      '#ifdef USE_INSTANCING',
      '  mvPosition = instanceMatrix * mvPosition;',
      '#endif',
      'mvPosition = modelViewMatrix * mvPosition;',
      'gl_Position = projectionMatrix * mvPosition;',
      'vec3 hullNormal = normalize( normalMatrix * objectNormal );',
      'gl_Position.xy += hullNormal.xy * 0.0042 * gl_Position.w;',
    ].join('\n'),
  )
}

let hull = null

function shadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(128, 128, 8, 128, 128, 122)
  grad.addColorStop(0, 'rgba(0,0,0,0.5)')
  grad.addColorStop(0.45, 'rgba(0,0,0,0.3)')
  grad.addColorStop(0.75, 'rgba(0,0,0,0.11)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 256, 256)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// A camera-facing sprite keeps the shadow an ellipse at any camera pitch,
// instead of the hard edge-on bar a floor plane gives at 5 degrees.
const shadow = new THREE.Sprite(
  new THREE.SpriteMaterial({
    map: shadowTexture(),
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  }),
)
shadow.renderOrder = -1
scene.add(shadow)

let theme = 'light'
let gltf = null
let mixer = null
let action = null
let clip = null
let config = []
let current = null
let bounds = null
let skeleton = null
let skinned = null

const V = THREE.Vector3

function clipConfig(id) {
  return config.find(c => c.id === id)
}

function collectBounds(entry, start, end) {
  const samples = 14
  const box = new THREE.Box3()
  const tmp = new THREE.Box3()
  for (let i = 0; i < samples; i++) {
    const t = start + ((end - start) * i) / (samples - 1 || 1)
    mixer.setTime(t)
    scene.updateMatrixWorld(true)
    skeleton.update()
    // Bounds from the posed vertices, not the bones: the rig carries a root
    // bone far below the body that would otherwise shrink every framing.
    skinned.computeBoundingBox()
    tmp.copy(skinned.boundingBox).applyMatrix4(skinned.matrixWorld)
    box.union(tmp)
  }
  const pad = box.getSize(new V()).length() * 0.035 + 0.02
  box.expandByScalar(pad)
  const pts = []
  for (const x of [box.min.x, box.max.x])
    for (const y of [box.min.y, box.max.y])
      for (const z of [box.min.z, box.max.z]) pts.push(new V(x, y, z))
  return { box, pts }
}

function frameCamera(entry, box, pts) {
  const center = box.getCenter(new V())
  const yaw = THREE.MathUtils.degToRad(entry.yaw ?? 90)
  const pitch = THREE.MathUtils.degToRad(entry.pitch ?? 6)
  const dir = new V(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch))

  camera.position.copy(center).addScaledVector(dir, 20)
  camera.up.set(0, 1, 0)
  camera.lookAt(center)
  camera.updateMatrixWorld()
  const inv = camera.matrixWorldInverse

  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  const q = new V()
  for (const p of pts) {
    q.copy(p).applyMatrix4(inv)
    minX = Math.min(minX, q.x)
    maxX = Math.max(maxX, q.x)
    minY = Math.min(minY, q.y)
    maxY = Math.max(maxY, q.y)
  }
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const right = new V().setFromMatrixColumn(camera.matrixWorld, 0)
  const up = new V().setFromMatrixColumn(camera.matrixWorld, 1)
  camera.position.addScaledVector(right, cx).addScaledVector(up, cy)

  const aspect = W / H
  const half = (Math.max(maxY - minY, (maxX - minX) / aspect) / 2) * (entry.margin ?? 1.22)
  camera.left = -half * aspect
  camera.right = half * aspect
  camera.top = half
  camera.bottom = -half
  camera.updateProjectionMatrix()

  // Contact shadow: a soft ellipse under the figure, sized to the motion.
  const size = box.getSize(new V())
  const wide = Math.max(size.x, size.z) * 1.25
  shadow.position.set(center.x, box.min.y + 0.02, center.z)
  shadow.scale.set(wide, wide * 0.17, 1)
}

function prepare(id) {
  const entry = clipConfig(id)
  if (!entry) throw new Error(`unknown clip ${id}`)
  const found = gltf.animations.find(a => a.name === entry.action)
  if (!found) throw new Error(`no action ${entry.action}`)

  if (action) action.stop()
  clip = found
  action = mixer.clipAction(clip)
  action.reset()
  action.play()

  const start = (entry.start ?? 0) * clip.duration
  const end = (entry.end ?? 1) * clip.duration
  bounds = collectBounds(entry, start, end)
  frameCamera(entry, bounds.box, bounds.pts)

  current = { ...entry, duration: clip.duration, start, end }
  applyLook()
  return {
    id,
    action: entry.action,
    duration: clip.duration,
    start,
    end,
    frames: Math.max(1, Math.round((end - start) * (entry.fps ?? 30))),
  }
}

function time(t) {
  mixer.setTime(t)
  scene.updateMatrixWorld(true)
  renderer.render(scene, camera)
  return true
}

function applyLook() {
  const dark = theme === 'dark'
  ink.color.set(dark ? PAPER_INK : INK)
  if (hullMat) hullMat.color.set(dark ? 0xefebe0 : 0x141412)
  shadow.visible = !dark && current?.shadow !== false
}

function setTheme(next) {
  theme = next
  applyLook()
  renderer.render(scene, camera)
}

async function init() {
  const cfg = await fetch('/tools/anim3d/clips.json').then(r => r.json())
  config = cfg.clips
  const loader = new GLTFLoader()
  gltf = await loader.loadAsync('/' + cfg.glb)
  scene.add(gltf.scene)

  gltf.scene.traverse(obj => {
    if (obj.isSkinnedMesh) {
      skeleton = obj.skeleton
      skinned = obj
      obj.material = ink
      obj.frustumCulled = false
    }
  })
  if (!skeleton) throw new Error('no skinned mesh in glb')

  hull = skinned.clone()
  hull.material = hullMat
  hull.frustumCulled = false
  skinned.parent.add(hull)

  mixer = new THREE.AnimationMixer(gltf.scene)
  setTheme('light')
  renderer.render(scene, camera)

  window.anim3d = {
    ready: true,
    width: W,
    height: H,
    list: () => gltf.animations.map(a => ({ name: a.name, duration: a.duration })),
    prepare,
    time,
    setTheme,
    current: () => current,
    probe: (id, times) => {
      prepare(id)
      const names = ['root', 'pelvis', 'head', 'ball_l']
      const rows = []
      for (const t of times) {
        mixer.setTime(t)
        scene.updateMatrixWorld(true)
        skeleton.update()
        skinned.computeBoundingBox()
        const b = skinned.boundingBox
        const row = { t, w: +(b.max.x - b.min.x).toFixed(3), h: +(b.max.y - b.min.y).toFixed(3), minY: +b.min.y.toFixed(3), maxY: +b.max.y.toFixed(3) }
        for (const n of names) {
          const b = skeleton.bones.find(x => x.name === n)
          if (b) row[n] = b.getWorldPosition(new V()).toArray().map(v => +v.toFixed(3))
        }
        rows.push(row)
      }
      return rows
    },
    debug: name => {
      const found = gltf.animations.find(a => a.name === name)
      mixer.setTime(0)
      scene.updateMatrixWorld(true)
      skeleton.update()
      skinned.computeBoundingBox()
      const box = skinned.boundingBox.clone().applyMatrix4(skinned.matrixWorld)
      return {
        clip: found && {
          name: found.name,
          duration: found.duration,
          tracks: found.tracks.length,
          keyframes: found.tracks[0]?.times.length,
        },
        box: { min: box.min.toArray(), max: box.max.toArray() },
        camera: { left: camera.left, right: camera.right, top: camera.top, bottom: camera.bottom },
        bones: skeleton.bones.slice(0, 8).map(b => ({ name: b.name, y: +b.getWorldPosition(new V()).y.toFixed(3) })),
      }
    },
  }
}

init().catch(err => {
  window.anim3d = { ready: false, error: String(err && (err.stack || err.message || err)) }
})
