const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname, '../', 'log', 'event.log')

function writeLog (log) {
  //创建一个写入流
  const writeStream = fs.createWriteStream(filename, {
    flags: 'a' //追加的形式
  })
  writeStream.write(log + '\n')
  //监听写入错误
  writeStream.on('error', error => {
    console.error('log error', error)
  })
}

module.exports = writeLog