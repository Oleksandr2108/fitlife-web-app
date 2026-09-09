const volumes = {
  tick: 0.08,
  finalTick: 0.12,
  start: 0.18,
  phaseComplete: 0.22,
  workoutComplete: 0.28,
} as const

let audioContext: AudioContext | null = null
let isUnlocked = false
let activeTick: OscillatorNode | null = null
const activeOscillators = new Set<OscillatorNode>()

function getAudioContext(): AudioContext | null {
  if (audioContext && audioContext.state !== 'closed') return audioContext
  try {
    audioContext = new AudioContext()
    return audioContext
  } catch {
    audioContext = null
    return null
  }
}

function stopOscillator(oscillator: OscillatorNode | null) {
  if (!oscillator) return
  try {
    oscillator.stop()
  } catch {
    // The sound may have already finished naturally.
  }
}

function playTone(frequency: number, delay: number, duration: number, volume: number, type: OscillatorType = 'sine'): OscillatorNode | null {
  const context = audioContext
  if (!context || !isUnlocked || context.state === 'closed') return null

  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const startAt = context.currentTime + delay
  const finishAt = startAt + duration

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, startAt)
  gain.gain.setValueAtTime(0.0001, startAt)
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, finishAt)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(startAt)
  oscillator.stop(finishAt + 0.02)
  activeOscillators.add(oscillator)
  oscillator.addEventListener('ended', () => {
    activeOscillators.delete(oscillator)
    if (activeTick === oscillator) activeTick = null
    oscillator.disconnect()
    gain.disconnect()
  }, { once: true })
  return oscillator
}

function stopTick() {
  stopOscillator(activeTick)
  activeTick = null
}

export async function unlockWorkoutAudio(): Promise<boolean> {
  const context = getAudioContext()
  if (!context) return false
  isUnlocked = true
  if (context.state === 'running') return true
  try {
    await context.resume()
    return true
  } catch {
    stopWorkoutAudio()
    return false
  }
}

export function playWorkoutStartSound() {
  stopTick()
  playTone(440, 0, 0.09, volumes.start)
  playTone(660, 0.08, 0.13, volumes.start)
}

export function playTickSound(remainingSeconds: number) {
  stopTick()
  activeTick = playTone(560, 0, 0.035, remainingSeconds <= 3 ? volumes.finalTick : volumes.tick, 'triangle')
}

export function playPhaseCompleteSound() {
  stopTick()
  playTone(620, 0, 0.08, volumes.phaseComplete)
  playTone(780, 0.07, 0.11, volumes.phaseComplete)
}

export function playWorkoutCompleteSound() {
  stopTick()
  playTone(523.25, 0, 0.16, volumes.workoutComplete)
  playTone(659.25, 0.1, 0.18, volumes.workoutComplete)
  playTone(783.99, 0.2, 0.24, volumes.workoutComplete)
}

export function stopWorkoutAudio() {
  activeOscillators.forEach(stopOscillator)
  activeOscillators.clear()
  activeTick = null
  isUnlocked = false
  if (audioContext?.state === 'running') void audioContext.suspend().catch(() => undefined)
}
