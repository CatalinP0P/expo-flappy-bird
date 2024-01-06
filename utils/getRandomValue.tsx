export function getRandomValue(min: number, max: number) {
  // Ensure that min and max are valid numbers
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Both min and max must be numbers')
  }

  // Ensure that min is less than max
  if (min >= max) {
    throw new Error('Min must be less than max')
  }

  // Generate a random value between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
