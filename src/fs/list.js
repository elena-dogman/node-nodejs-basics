import { promises as fs } from 'fs'
import { join } from 'path'

const list = async () => {
  const filesDir = join(process.cwd(), 'src', 'fs', 'files')

  try {
    await fs.access(filesDir)
    const filenames = await fs.readdir(filesDir)
    console.log(filenames)
  } catch (error) {
    throw new Error('FS operation failed')
  }
}

await list()
