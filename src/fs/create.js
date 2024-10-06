import { promises as fs } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const create = async () => {
  const filePath = join(__dirname, 'files', 'fresh.txt')
  const content = 'I am fresh and young'

  try {
    await fs.access(filePath)
    throw new Error('FS operation failed')
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, content)
      console.log('File created successfully')
    } else {
      throw error
    }
  }
}

await create()
