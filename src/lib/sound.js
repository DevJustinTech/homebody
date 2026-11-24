// Tiny synthesized cues, so there are no audio files to download.
let context

export function beep(kind = 'work') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    context ||= new AudioContext()
    if (context.state === 'suspended') context.resume()
    const osc = context.createOscillator()
    const gain = context.createGain()
    osc.connect(gain)
    gain.connect(context.destination)
    const now = context.currentTime
    osc.frequency.value = kind === 'done' ? 660 : kind === 'rest' ? 392 : 523
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2)
    osc.start(now)
    osc.stop(now + 0.22)
  } catch {
    // Audio is a nicety. Silence is an acceptable fallback.
  }
}
