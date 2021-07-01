//服务启动配置
const http = require('http')
const handleServer = require('../app')

const server = http.createServer(handleServer)

const port = 8000
server.listen(port, () => {
  console.log('serve is start:' + port)
})