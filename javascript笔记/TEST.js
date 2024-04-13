const fs = require('fs').promises
const path = require('path')

// 指定要读取的文件夹路径
const folderPath =
  '/Users/smc/Downloads/毕设/软件开发用训练图/1：1 10×典型图，易区分'

async function processFiles() {
  try {
    const files = await fs.readdir(folderPath)

    for (let file of files) {
      if (!file.endsWith('txt')) continue

      const filePath = path.join(folderPath, file)
      const content = await fs.readFile(filePath, 'utf8')
      console.log(content)

      // 可以在这里对文件内容进行进一步的处理
    }
    console.log('All files have been processed successfully.')
  } catch (err) {
    console.error('An error occurred:', err)
  }
}

processFiles()
