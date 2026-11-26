// Render frames (or contact sheets) from the vendored CC0 rig with headless
// Brave. Usage:
//
//   node tools/anim3d/render.mjs --clips pushup --frames 8 --size 600 \
//     --out tools/anim3d/out/contact
//
//   node tools/anim3d/render.mjs --clips pushup,jumpingJack --all \
//     --size 960 --theme light --out tools/anim3d/frames
//
// `--all` renders every frame the clip config asks for (fps x trimmed
// duration); otherwise `--frames N` samples N evenly spaced stills.
import { createServer } from 'node:http'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const ROOT = resolve(fileURLToPath(new URL('../..', import.meta.url)))
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.glb': 'model/gltf-binary',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.css': 'text/css',
}

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) continue
    const key = a.slice(2)
    const next = argv[i + 1]
    if (next && !next.startsWith('--')) {
      out[key] = next
      i++
    } else {
      out[key] = true
    }
  }
  return out
}

function serve() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://x')
      const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '')
      const file = join(ROOT, rel)
      if (!file.startsWith(ROOT)) throw new Error('outside root')
      const info = await stat(file).catch(() => null)
      if (!info || !info.isFile()) {
        res.writeHead(404)
        res.end('not found')
        return
      }
      res.writeHead(200, {
        'content-type': TYPES[extname(file)] || 'application/octet-stream',
        'content-length': info.size,
        'cache-control': 'no-store',
      })
      createReadStream(file).pipe(res)
    } catch (err) {
      res.writeHead(500)
      res.end(String(err))
    }
  })
  return new Promise(done => {
    server.listen(0, '127.0.0.1', () => done({ server, port: server.address().port }))
  })
}

const args = parseArgs(process.argv.slice(2))
const ids = String(args.clips || 'pushup').split(',').filter(Boolean)
const width = Number(args.w || 800)
const height = Number(args.h || 600)
const themes = args.theme === 'both' ? ['light', 'dark'] : [args.theme || 'light']
const outDir = resolve(ROOT, args.out || 'tools/anim3d/out/frames')
const all = Boolean(args.all)
const stills = Number(args.frames || 8)

const brave = process.env.BRAVE || '/usr/bin/brave'
const { server, port } = await serve()

const browser = await puppeteer.launch({
  executablePath: brave,
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--hide-scrollbars',
    '--mute-audio',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
  ],
  defaultViewport: { width, height, deviceScaleFactor: 1 },
})

let ok = false
try {
  const page = await browser.newPage()
  page.on('console', msg => {
    const text = msg.text()
    if (!text.includes('[.WebGL-')) console.log('[page]', text)
  })
  page.on('pageerror', err => console.error('[page error]', err.message))

  await page.goto(`http://127.0.0.1:${port}/tools/anim3d/viewer.html?w=${width}&h=${height}`, {
    waitUntil: 'networkidle0',
    timeout: 120000,
  })
  await page.waitForFunction('window.anim3d && (window.anim3d.ready || window.anim3d.error)', { timeout: 120000 })
  const boot = await page.evaluate(() => window.anim3d.error || null)
  if (boot) throw new Error(boot)

  const available = await page.evaluate(() => window.anim3d.list())
  console.log(`glb has ${available.length} actions`)

  if (args.probe) {
    const rows = await page.evaluate((id, times) => window.anim3d.probe(id, times), args.probe, [0, 0.3, 0.6, 0.9, 1.2])
    console.log(JSON.stringify(rows, null, 2))
    await browser.close()
    server.close()
    process.exit(0)
  }

  if (args.debug) {
    const info = await page.evaluate(n => window.anim3d.debug(n), args.debug)
    console.log(JSON.stringify(info, null, 2))
    await browser.close()
    server.close()
    process.exit(0)
  }

  for (const theme of themes) {
    await page.evaluate(t => window.anim3d.setTheme(t), theme)
    for (const id of ids) {
      const info = await page.evaluate(i => window.anim3d.prepare(i), id)
      const dir = themes.length > 1 ? join(outDir, theme, id) : join(outDir, id)
      await mkdir(dir, { recursive: true })

      const count = all ? info.frames : stills
      const times = []
      for (let i = 0; i < count; i++) {
        const t = all
          ? info.start + i / (info.fps ?? 30)
          : info.start + ((info.end - info.start) * i) / Math.max(1, count - 1)
        times.push(t)
      }

      console.log(
        `${theme}/${id}: ${info.action} ${info.duration.toFixed(2)}s, frames ${info.start.toFixed(2)}–${info.end.toFixed(2)}, rendering ${count}`,
      )
      const started = Date.now()
      for (let i = 0; i < times.length; i++) {
        await page.evaluate(t => window.anim3d.time(t), times[i])
        const file = join(dir, String(i).padStart(4, '0') + '.png')
        await page.screenshot({ path: file, omitBackground: true, type: 'png' })
      }
      console.log(`  ${((Date.now() - started) / 1000).toFixed(1)}s -> ${dir}`)
    }
  }

  await writeFile(
    join(outDir, 'manifest.json'),
    JSON.stringify({ width, height, themes, ids, all, stills, renderedAt: new Date().toISOString() }, null, 2),
  )
  ok = true
} finally {
  await browser.close()
  server.close()
}
if (!ok) process.exitCode = 1
