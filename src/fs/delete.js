import { promises as fs } from 'fs'
import { join } from 'path'

const remove = async () => {
  const filePath = join(process.cwd(), 'src', 'fs', 'files', 'fileToRemove.txt')

  try {
    await fs.access(filePath)

    await fs.unlink(filePath)
    console.log('File deleted successfully')
  } catch (error) {
    throw new Error('FS operation failed')
  }
}

await remove()
