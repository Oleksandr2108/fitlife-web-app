import type { Exercise, Workout } from '../types'

const exercises: Record<string, Exercise> = {
  squat: { id: 'exercise-squat', name: 'Bodyweight Squat', instructions: 'Sit the hips back, keep the chest lifted, then stand tall.', repetitions: 12, restDurationSeconds: 30 },
  pushup: { id: 'exercise-pushup', name: 'Incline Push-Up', instructions: 'Keep a straight line from shoulders to heels and lower with control.', repetitions: 10, restDurationSeconds: 30 },
  climber: { id: 'exercise-climber', name: 'Mountain Climber', instructions: 'Drive alternating knees forward while keeping the hips steady.', durationSeconds: 40, restDurationSeconds: 20 },
  plank: { id: 'exercise-plank', name: 'Forearm Plank', instructions: 'Brace the core and keep the body in one long line.', durationSeconds: 40, restDurationSeconds: 20 },
  lunge: { id: 'exercise-lunge', name: 'Reverse Lunge', instructions: 'Step back softly and lower until both knees are comfortably bent.', repetitions: 10, restDurationSeconds: 30 },
  bridge: { id: 'exercise-bridge', name: 'Glute Bridge', instructions: 'Press through the feet and lift the hips without arching the back.', repetitions: 15, restDurationSeconds: 20 },
  deadBug: { id: 'exercise-dead-bug', name: 'Dead Bug', instructions: 'Lower opposite arm and leg while keeping the lower back grounded.', repetitions: 10, restDurationSeconds: 20 },
  catCow: { id: 'exercise-cat-cow', name: 'Cat-Cow Flow', instructions: 'Move slowly between spinal flexion and extension with your breath.', durationSeconds: 60 },
}

export const workoutsMock: Workout[] = [
  { id: 'workout-001', slug: 'full-body-reset', title: 'Full Body Reset', description: 'A balanced, low-impact session to wake up every major muscle group.', difficulty: 'beginner', durationMinutes: 20, category: 'full-body', equipment: [], imageUrl: '/images/workouts/full-body-reset.webp', exercises: [exercises.squat, exercises.pushup, exercises.bridge] },
  { id: 'workout-002', slug: 'strength-foundations', title: 'Strength Foundations', description: 'Build durable lower- and upper-body strength with controlled basics.', difficulty: 'beginner', durationMinutes: 30, category: 'strength', equipment: ['Dumbbells'], imageUrl: '/images/workouts/strength-foundations.webp', exercises: [exercises.squat, exercises.lunge, exercises.pushup] },
  { id: 'workout-003', slug: 'quick-cardio-boost', title: 'Quick Cardio Boost', description: 'A short, energetic circuit that raises your heart rate without equipment.', difficulty: 'intermediate', durationMinutes: 10, category: 'cardio', equipment: [], imageUrl: '/images/workouts/quick-cardio-boost.webp', exercises: [exercises.climber, exercises.squat, exercises.lunge] },
  { id: 'workout-004', slug: 'core-control', title: 'Core Control', description: 'Practice steady, functional core strength and trunk control.', difficulty: 'intermediate', durationMinutes: 20, category: 'core', equipment: ['Exercise mat'], imageUrl: '/images/workouts/core-control.webp', exercises: [exercises.deadBug, exercises.plank, exercises.bridge] },
  { id: 'workout-005', slug: 'mobility-unwind', title: 'Mobility Unwind', description: 'Gentle mobility work for hips, spine, and shoulders after a busy day.', difficulty: 'beginner', durationMinutes: 10, category: 'mobility', equipment: ['Exercise mat'], imageUrl: '/images/workouts/mobility-unwind.webp', exercises: [exercises.catCow, exercises.lunge, exercises.bridge] },
  { id: 'workout-006', slug: 'power-circuit', title: 'Power Circuit', description: 'A demanding full-body circuit for experienced movers.', difficulty: 'advanced', durationMinutes: 30, category: 'full-body', equipment: ['Dumbbells'], imageUrl: '/images/workouts/power-circuit.webp', exercises: [exercises.climber, exercises.squat, exercises.pushup, exercises.plank] },
]
