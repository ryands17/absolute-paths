import { Worker } from 'worker_threads'

type AsyncFunction<T> = (...args: any[]) => Promise<T>

export const workerize = <T>(
  fn: AsyncFunction<T>,
  workerOptions: WorkerOptions = {}
): AsyncFunction<T> => {
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(
        `
        const { parentPort } = require('worker_threads')
        Promise.resolve((${fn.toString()})(${args})).then(returnedData => {
          parentPort.postMessage(returnedData)
        })
      `,
        { ...workerOptions, eval: true }
      )
      worker.on('message', resolve)
      worker.on('error', reject)
      worker.on('exit', code => {
        if (code === 0) {
          resolve(undefined)
        } else {
          reject(new Error(`Worker stopped with exit code ${code}`))
        }
      })
    })
  }
}
