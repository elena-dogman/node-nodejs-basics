import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'
import { createGzip } from 'zlib'

const compress = async () => {
  const filePath = join(
    process.cwd(),
    'src',
    'zip',
    'files',
    'fileToCompress.txt'
  )
  const compressedFilePath = join(
    process.cwd(),
    'src',
    'zip',
    'files',
    'archive.gz'
  )

  const readStream = createReadStream(filePath)
  const writeStream = createWriteStream(compressedFilePath)
  const gzipStream = createGzip()

  readStream.pipe(gzipStream).pipe(writeStream)

  readStream.on('error', err =>
    console.error(`Error reading file: ${err.message}`)
  )
  writeStream.on('error', err =>
    console.error(`Error writing file: ${err.message}`)
  )

  writeStream.on('finish', () => {
    console.log('File successfully compressed to archive.gz')
  })
}

await compress()
