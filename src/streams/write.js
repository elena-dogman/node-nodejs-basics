import { createWriteStream } from 'fs'
import { join } from 'path'

const write = async () => {
  const filePath = join(
    process.cwd(),
    'src',
    'streams',
    'files',
    'fileToWrite.txt'
  )

  const writableStream = createWriteStream(filePath)

  process.stdin.pipe(writableStream)

  writableStream.on('error', err => {
    console.error(`Error writing to file: ${err.message}`)
  })

  writableStream.on('finish', () => {
    console.log('Finished writing to file')
  })
}

await write()
