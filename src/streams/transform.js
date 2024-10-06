import { Transform } from 'stream'

const transform = async () => {
  const reverseTextStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedText = chunk.toString().split('').reverse().join('')
      callback(null, reversedText)
    },
  })

  process.stdin.pipe(reverseTextStream).pipe(process.stdout)
}

await transform()
