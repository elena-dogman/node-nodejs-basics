import { promises as fs } from 'fs'
import { join } from 'path'

const copy = async () => {
  const sourceDir = join(process.cwd(), 'src', 'fs', 'files')
  const destinationDir = join(process.cwd(), 'src', 'fs', 'files_copy')

  try {
    await fs.access(sourceDir)
    await fs.access(destinationDir)
    throw new Error('FS operation failed')
  } catch (error) {
    if (error.code === 'ENOENT') {
      await copyDirectory(sourceDir, destinationDir)
      console.log('Folder copied successfully')
    } else {
      throw error
    }
  }
}
const copyDirectory = async (sourceDir, destinationDir) => {
  await fs.mkdir(destinationDir)
  const entries = await fs.readdir(sourceDir, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry.name)
    const destinationPath = join(destinationDir, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath)
    } else {
      await fs.copyFile(sourcePath, destinationPath)
    }
  }
}

await copy()
