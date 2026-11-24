import { BODY, STAGE, add, joints, upDir } from './geometry.js'

const INK = 'var(--fig-ink)'
const LIMB = 'var(--fig-limb)'
const FAR = 'var(--fig-far)'
const PAPER = 'var(--fig-paper)'
const LINE = 'var(--fig-line)'
const SOFT = 'var(--fig-soft)'

function limbPath(a, b, c) {
  return `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`
}

function Torso({ p, j }) {
  const lower = upDir(p.torso)
  const upper = upDir(p.torso + (p.curl || 0))
  const pl = { x: lower.y, y: -lower.x }
  const pu = { x: upper.y, y: -upper.x }
  const mix = { x: (pl.x + pu.x) / 2, y: (pl.y + pu.y) / 2 }
  const mlen = Math.hypot(mix.x, mix.y) || 1
  const pw = { x: mix.x / mlen, y: mix.y / mlen }
  const cw = p.view === 'front' ? 21 : 19
  const ww = p.view === 'front' ? 14 : 12.5
  const hw = p.view === 'front' ? 16 : 14.5
  const c1 = add(j.chest, { x: pu.x * cw, y: pu.y * cw })
  const c2 = add(j.chest, { x: -pu.x * cw, y: -pu.y * cw })
  const w1 = add(j.waist, { x: pw.x * ww, y: pw.y * ww })
  const w2 = add(j.waist, { x: -pw.x * ww, y: -pw.y * ww })
  const h1 = add(j.pelvis, { x: pl.x * hw, y: pl.y * hw })
  const h2 = add(j.pelvis, { x: -pl.x * hw, y: -pl.y * hw })
  const path = `M ${c1.x} ${c1.y}
    L ${w1.x} ${w1.y}
    L ${h1.x} ${h1.y}
    L ${h2.x} ${h2.y}
    L ${w2.x} ${w2.y}
    L ${c2.x} ${c2.y}
    Z`
  const bandA = add(j.pelvis, { x: pl.x * (hw + 0.5), y: pl.y * (hw + 0.5) })
  const bandB = add(j.pelvis, { x: -pl.x * (hw + 0.5), y: -pl.y * (hw + 0.5) })
  const band = `M ${bandA.x} ${bandA.y} L ${bandB.x} ${bandB.y}`
  return (
    <g>
      <path d={path} fill={INK} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d={band} stroke={PAPER} strokeWidth="2.2" opacity="0.9" strokeLinecap="round" />
      {p.view === 'front' && (
        <path
          d={`M ${j.chest.x - 9} ${j.chest.y + 2} L ${j.chest.x} ${j.chest.y + 12} L ${j.chest.x + 9} ${j.chest.y + 2}`}
          fill="none"
          stroke={PAPER}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
      )}
    </g>
  )
}

function Head({ p, j }) {
  const f = p.facing || 1
  const r = BODY.head
  const neckAngle = p.torso + (p.curl || 0) + p.head
  const nd = upDir(neckAngle)
  const eyes =
    p.view === 'side'
      ? [(() => {
          const fd = upDir(neckAngle + 90 * f)
          return { x: j.head.x + fd.x * 5.5 + nd.x * 2, y: j.head.y + fd.y * 5.5 + nd.y * 2 }
        })()]
      : [
          { x: j.head.x - 5.5, y: j.head.y - 3 },
          { x: j.head.x + 5.5, y: j.head.y - 3 },
        ]
  return (
    <g>
      <path
        d={`M ${j.chest.x} ${j.chest.y} L ${j.head.x} ${j.head.y}`}
        stroke={INK}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx={j.head.x} cy={j.head.y} r={r} fill={INK} />
      {eyes.map((e, i) => (
        <circle key={i} cx={e.x} cy={e.y} r="1.5" fill={PAPER} />
      ))}
    </g>
  )
}

function Arm({ side, p, j, far }) {
  const shoulder = side === 'A' ? j.shoulderA : j.shoulderB
  const elbow = side === 'A' ? j.elbowA : j.elbowB
  const hand = side === 'A' ? j.handA : j.handB
  const w = p.view === 'front' ? 10.5 : 11.5
  return (
    <g>
      <path d={limbPath(shoulder, elbow, hand)} fill="none" stroke={far ? FAR : LIMB} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={hand.x} cy={hand.y} r={w * 0.58} fill={far ? FAR : LIMB} />
    </g>
  )
}

function Leg({ side, p, j, far }) {
  const hip = side === 'A' ? j.hipA : j.hipB
  const knee = side === 'A' ? j.kneeA : j.kneeB
  const ankle = side === 'A' ? j.ankleA : j.ankleB
  const toe = side === 'A' ? j.toeA : j.toeB
  const w = p.view === 'front' ? 14 : 15.5
  const lift = (side === 'A' ? p.liftA : p.liftB) || 0
  return (
    <g transform={lift ? `translate(0 ${-lift})` : undefined}>
      <path d={limbPath(hip, knee, ankle)} fill="none" stroke={far ? FAR : LIMB} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      {p.view === 'side' ? (
        <path d={limbPath(ankle, toe, toe)} fill="none" stroke={far ? FAR : LIMB} strokeWidth={w * 0.72} strokeLinecap="round" />
      ) : (
        <ellipse cx={ankle.x} cy={ankle.y + 3} rx={w * 0.62} ry={w * 0.38} fill={far ? FAR : LIMB} />
      )}
    </g>
  )
}

function Chair({ x = 282, seatY = 200, facing = -1, width = 56, height = 54, ground = BODY.ground }) {
  const backX = x + facing * (width / 2)
  const frontX = x - facing * (width / 2)
  return (
    <g fill="none" stroke={LINE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${frontX} ${seatY} L ${backX} ${seatY} L ${backX} ${seatY - height}`} />
      <path d={`M ${backX - facing * 8} ${seatY - height} L ${backX} ${seatY - height} L ${backX} ${seatY - height + 8}`} />
      <path d={`M ${frontX} ${seatY} L ${frontX} ${ground}`} />
      <path d={`M ${backX} ${seatY} L ${backX} ${ground}`} />
      <path d={`M ${frontX + 4} ${seatY + 2} L ${backX - 4} ${seatY + 2}`} opacity="0.5" />
    </g>
  )
}

function Wall({ x = 324, facing = -1 }) {
  return (
    <g stroke={LINE} strokeWidth="2" fill="none" strokeLinecap="round">
      <path d={`M ${x} 36 L ${x} ${BODY.ground}`} />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M ${x} ${64 + i * 25} l ${facing * 12} 12`} opacity="0.55" />
      ))}
    </g>
  )
}

function Table({ x = 280, topY = 160, width = 110, ground = BODY.ground }) {
  return (
    <g fill="none" stroke={LINE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${x - width / 2} ${topY} L ${x + width / 2} ${topY}`} />
      <path d={`M ${x - width / 2 + 8} ${topY} L ${x - width / 2 + 8} ${ground}`} />
      <path d={`M ${x + width / 2 - 8} ${topY} L ${x + width / 2 - 8} ${ground}`} />
      <path d={`M ${x - width / 2} ${topY + 7} L ${x + width / 2} ${topY + 7}`} opacity="0.45" />
    </g>
  )
}

function Bar({ y = 48, left = 118, right = 282, ground = BODY.ground }) {
  return (
    <g fill="none" stroke={LINE} strokeWidth="2.2" strokeLinecap="round">
      <path d={`M ${left} ${y} L ${right} ${y}`} />
      <path d={`M ${left} ${y} L ${left} ${ground}`} />
      <path d={`M ${right} ${y} L ${right} ${ground}`} />
      <path d={`M ${left - 8} ${y - 3} L ${left - 8} ${y + 3}`} />
      <path d={`M ${right + 8} ${y - 3} L ${right + 8} ${y + 3}`} />
    </g>
  )
}

function Backpack({ p, j }) {
  const f = p.facing || 1
  const center = add(add(j.chest, { x: -f * 18, y: 0 }), { x: 0, y: 18 })
  return (
    <g transform={`translate(${center.x} ${center.y}) rotate(${-p.torso})`}>
      <rect x="-17" y="-22" width="34" height="44" rx="8" fill="none" stroke={LINE} strokeWidth="2.2" />
      <path d="M -12 -14 Q 0 -20 12 -14" fill="none" stroke={LINE} strokeWidth="2" />
      <path d="M -17 -8 L -22 -2" stroke={LINE} strokeWidth="2" strokeLinecap="round" />
      <path d="M 17 -8 L 22 -2" stroke={LINE} strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

function Band({ j, between = 'hands', color = 'var(--fig-band)' }) {
  const a = between === 'ankles' ? j.ankleA : j.handA
  const b = between === 'ankles' ? j.ankleB : j.handB
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 + (between === 'ankles' ? 10 : 12)
  return (
    <path
      d={`M ${a.x} ${a.y} Q ${mx} ${my}, ${b.x} ${b.y}`}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="0"
    />
  )
}

function Towel({ j }) {
  const a = j.handA
  const b = j.handB
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 + 6
  return (
    <path
      d={`M ${a.x} ${a.y} Q ${mx} ${my + 5}, ${b.x} ${b.y}`}
      fill="none"
      stroke={LINE}
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeDasharray="5 4"
    />
  )
}

function Bottles({ j }) {
  return (
    <g fill="none" stroke={LINE} strokeWidth="2">
      {[j.handA, j.handB].map((h, i) => (
        <g key={i}>
          <rect x={h.x - 5} y={h.y + 2} width="10" height="18" rx="3" fill={SOFT} />
          <path d={`M ${h.x - 3} ${h.y + 2} L ${h.x - 3} ${h.y - 2} L ${h.x + 3} ${h.y - 2} L ${h.x + 3} ${h.y + 2}`} />
        </g>
      ))}
    </g>
  )
}

function Cushion({ x = 200, y = 250, w = 64, h = 12 }) {
  return <rect x={x - w / 2} y={y - h} width={w} height={h} rx="6" fill={SOFT} stroke={LINE} strokeWidth="1.6" />
}

function Steps({ x = 292 }) {
  return (
    <g fill="none" stroke={LINE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${x - 30} ${BODY.ground} L ${x - 30} 232 L ${x + 2} 232 L ${x + 2} 210 L ${x + 34} 210 L ${x + 34} ${BODY.ground}`} />
      <path d={`M ${x - 30} 238 L ${x + 2} 238`} opacity="0.5" />
      <path d={`M ${x + 2} 216 L ${x + 34} 216`} opacity="0.5" />
    </g>
  )
}

function Doorway({ x = 292 }) {
  return (
    <g fill="none" stroke={LINE} strokeWidth="2" strokeLinecap="round">
      <path d={`M ${x} 60 L ${x} ${BODY.ground}`} />
      <path d={`M ${x + 46} 60 L ${x + 46} ${BODY.ground}`} />
      <path d={`M ${x} 60 L ${x + 46} 60`} />
    </g>
  )
}

function Prop({ kind, j, p, ...opts }) {
  switch (kind) {
    case 'chair':
      return <Chair {...opts} />
    case 'wall':
      return <Wall {...opts} />
    case 'table':
      return <Table {...opts} />
    case 'bar':
      return <Bar {...opts} />
    case 'backpack':
      return <Backpack p={p} j={j} />
    case 'band':
      return <Band j={j} between={opts.between} />
    case 'towel':
      return <Towel j={j} />
    case 'bottles':
      return <Bottles j={j} />
    case 'cushion':
      return <Cushion {...opts} />
    case 'steps':
      return <Steps {...opts} />
    case 'doorway':
      return <Doorway {...opts} />
    case 'rope':
      return <Rope j={j} />
    default:
      return null
  }
}

export default function Figure({
  pose,
  props = [],
  className = '',
  showFloor = true,
  mat = true,
  preserve = 'xMidYMid meet',
  viewBox = `0 0 ${STAGE.w} ${STAGE.h}`,
  title,
}) {
  const j = joints(pose)
  const behind = props.filter(x => x.behind !== false)
  const front = props.filter(x => x.behind === false)
  return (
    <svg
      className={'figure ' + className}
      viewBox={viewBox}
      preserveAspectRatio={preserve}
      role="img"
      aria-label={title || 'Exercise demonstration'}
    >
      {title && <title>{title}</title>}
      {showFloor && (
        <g>
          <path d={`M 26 ${BODY.ground} L 374 ${BODY.ground}`} stroke={LINE} strokeWidth="1.4" />
          {mat && <rect x="112" y={BODY.ground - 7} width="176" height="7" rx="3.5" fill={SOFT} />}
        </g>
      )}
      {behind.map((pr, i) => <Prop key={i} kind={pr.kind} j={j} p={pose} {...pr} />)}
      <Arm side="B" p={pose} j={j} far />
      <Leg side="B" p={pose} j={j} far />
      <Torso p={pose} j={j} />
      <Head p={pose} j={j} />
      <Leg side="A" p={pose} j={j} />
      <Arm side="A" p={pose} j={j} />
      {front.map((pr, i) => <Prop key={i} kind={pr.kind} j={j} p={pose} {...pr} />)}
    </svg>
  )
}

function Rope({ j }) {
  const a = j.handA
  const b = j.handB
  const low = BODY.ground - 4
  return (
    <path
      d={`M ${a.x} ${a.y} Q ${a.x - 22} ${low}, ${(a.x + b.x) / 2} ${low} Q ${b.x + 22} ${low}, ${b.x} ${b.y}`}
      fill="none"
      stroke={LINE}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="3 5"
      opacity="0.75"
    />
  )
}
