// Short sessions for days when a program is too much to think about.

const q = (id, name, blurb, focus, exercises) => ({ id, name, blurb, focus, exercises })

export const quickSessions = [
  q('morning-reset', 'Morning reset', 'Wake the spine and hips up before the day starts.', 'Mobility', [
    { id: 'cat-cow', sets: 1 },
    { id: 'wall-angel', sets: 1 },
    { id: 'deep-squat-hold', sets: 1 },
    { id: 'hip-flexor-stretch', sets: 1 },
    { id: 'standing-forward-fold', sets: 1 },
    { id: 'neck-stretch', sets: 1 },
  ]),
  q('desk-break', 'Desk break', 'Five minutes for the neck, shoulders and hips.', 'Posture', [
    { id: 'neck-stretch', sets: 1 },
    { id: 'wall-angel', sets: 1 },
    { id: 'chest-stretch', sets: 1 },
    { id: 'seated-twist', sets: 1 },
    { id: 'calf-stretch', sets: 1 },
  ]),
  q('core-ten', 'Core ten', 'A short, quiet brace-and-breathe session.', 'Core', [
    { id: 'dead-bug', sets: 2, reps: '8 each side' },
    { id: 'bird-dog', sets: 2, reps: '8 each side' },
    { id: 'glute-bridge', sets: 2, reps: '12' },
    { id: 'plank', sets: 2, work: 25 },
    { id: 'side-plank', sets: 2, work: 20 },
  ]),
  q('quiet-legs', 'Quiet legs', 'No jumps, no thumps, still a real workout.', 'Lower body', [
    { id: 'leg-swings', sets: 1 },
    { id: 'chair-squat', sets: 3, reps: '10' },
    { id: 'glute-bridge', sets: 3, reps: '15' },
    { id: 'single-leg-calf-raise', sets: 2, reps: '10 each side' },
    { id: 'wall-sit', sets: 2, work: 30 },
  ]),
  q('travel-ten', 'Travel ten', 'A hotel-room session with no equipment.', 'Full body', [
    { id: 'march-in-place', sets: 1 },
    { id: 'bodyweight-squat', sets: 2, reps: '12' },
    { id: 'pushup', sets: 2, reps: '8' },
    { id: 'reverse-lunge', sets: 2, reps: '6 each side' },
    { id: 'plank', sets: 2, work: 20 },
  ]),
  q('wake-up', 'Wake-up call', 'A gentle cardio start that stays quiet.', 'Cardio', [
    { id: 'march-in-place', sets: 2, work: 40 },
    { id: 'step-touch', sets: 2, work: 40 },
    { id: 'shadow-boxing', sets: 2, work: 40 },
    { id: 'bodyweight-squat', sets: 2, reps: '10' },
    { id: 'calf-stretch', sets: 1 },
  ]),
]

export const quickById = Object.fromEntries(quickSessions.map(session => [session.id, session]))
