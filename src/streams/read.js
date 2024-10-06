import { createReadStream } from 'fs'
import { join } from 'path'

const read = async () => {
  const filePath = join(
    process.cwd(),
    'src',
    'streams',
    'files',
    'fileToRead.txt'
  )

  const stream = createReadStream(filePath)

  stream.pipe(process.stdout)

  stream.on('error', err => {
    console.error(`Error reading file: ${err.message}`)
  })
}

await read()
