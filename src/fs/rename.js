import { promises as fs } from 'fs'
import { join } from 'path'

const rename = async () => {
  const wrongFilename = join(
    process.cwd(),
    'src',
    'fs',
    'files',
    'wrongFilename.txt'
  )
  const properFilename = join(
    process.cwd(),
    'src',
    'fs',
    'files',
    'properFilename.md'
  )

  try {
    await fs.access(wrongFilename)

    await fs.access(properFilename)
    throw new Error('FS operation failed')
  } catch (error) {
    if (error.code === 'ENOENT' && error.path === properFilename) {
      await fs.rename(wrongFilename, properFilename)
    } else {
      throw new Error('FS operation failed')
    }
  }
}

await rename()
