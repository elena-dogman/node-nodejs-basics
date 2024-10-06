import { createHash } from 'crypto'
import { createReadStream } from 'fs'
import { join } from 'path'

const calculateHash = async () => {
  const filePath = join(
    process.cwd(),
    'src',
    'hash',
    'files',
    'fileToCalculateHashFor.txt'
  )

  const stream = createReadStream(filePath)

  const hash = createHash('sha256')

  stream.on('data', chunk => {
    hash.update(chunk)
  })

  stream.on('end', () => {
    const hexHash = hash.digest('hex')
    console.log(`SHA256 hash: ${hexHash}`)
  })

  stream.on('error', err => {
    console.error(`Error reading file: ${err.message}`)
  })
}

await calculateHash()
