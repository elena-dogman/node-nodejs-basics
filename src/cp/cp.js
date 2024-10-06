import { spawn } from 'child_process'
import { join } from 'path'

const spawnChildProcess = async args => {
  const scriptPath = join(process.cwd(), 'src', 'cp', 'files', 'script.js')

  const childProcess = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  })

  process.stdin.pipe(childProcess.stdin)

  childProcess.stdout.pipe(process.stdout)

  childProcess.on('close', code => {
    console.log(`Child process exited with code ${code}`)
  })
}

spawnChildProcess(['arg1', 'arg2'])
