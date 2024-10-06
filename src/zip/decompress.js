import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'
import { createGunzip } from 'zlib'

const decompress = async () => {
  const archivePath = join(process.cwd(), 'src', 'zip', 'files', 'archive.gz')
  const decompressedFilePath = join(
    process.cwd(),
    'src',
    'zip',
    'files',
    'fileToCompress.txt'
  )

  const readStream = createReadStream(archivePath)
  const writeStream = createWriteStream(decompressedFilePath)
  const gunzipStream = createGunzip()

  readStream.pipe(gunzipStream).pipe(writeStream)

  readStream.on('error', err =>
    console.error(`Error reading archive: ${err.message}`)
  )
  writeStream.on('error', err =>
    console.error(`Error writing file: ${err.message}`)
  )

  writeStream.on('finish', () => {
    console.log('File successfully decompressed to fileToCompress.txt')
  })
}

await decompress()
