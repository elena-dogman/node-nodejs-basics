import { cpus } from 'os'
import { join } from 'path'
import { Worker } from 'worker_threads'
const performCalculations = async () => {
  const numCores = cpus().length
  const workers = []
  const results = []

  for (let i = 0; i < numCores; i++) {
    const workerPath = join(process.cwd(), 'src', 'wt', 'worker.js')
    const worker = new Worker(workerPath)

    workers.push(
      new Promise(resolve => {
        worker.on('message', message => {
          resolve(message)
        })

        worker.on('error', () => {
          resolve({ status: 'error', data: null })
        })

        worker.on('exit', code => {
          if (code !== 0) {
            resolve({ status: 'error', data: null })
          }
        })

        worker.postMessage(10 + i)
      })
    )
  }

  const workerResults = await Promise.all(workers)

  console.log(workerResults)
}

await performCalculations()
