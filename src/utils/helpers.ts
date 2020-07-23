import { workerize } from './worker'

export const add = (a: number, b: number) => a + b

export const fibonacciAtGivenSequence = workerize(async (position: number) => {
  let [a, b] = [0, 1]
  if (position === 0) return a
  if (position === 1) return b

  let i = 2
  while (i <= position) {
    ;[a, b] = [b, a + b]
    i++
  }
  return a
})
