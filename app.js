const blogRouter = require('./router/blogRouter')
const userRouter = require('./router/userRouter')
//解析get
const querystring = require('querystring')
//解析post
const bodypaser = require('./utils/bodyParse')
//解析cookie中间件
const cookieParse = require('./utils/cookieParse')
//cookire增加过期时间，防止关闭页面就丢失
const getExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}
//存储session_data
let SESSION_DATA = {}
//写入日志
const writeLog = require('./utils/writeLog')
function handleServer (req, res) {
  //设置响应头
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
  res.setHeader('Access-Control-Allow-Headers', 'Test-CORS, Content-Type')
  // res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Methods', '*')

  //路由,放置到req.path上
  const url = req.url
  req.path = url.split('?')[0]
  //处理get,放置到req.query上
  req.query = querystring.parse(url.split('?')[1])
  //处理cookie,放置到req.cookie
  req.cookie = cookieParse(req)
  //存放到session
  let userId = req.cookie.userId //cookie 标识key
  let needCookie = false
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]
  console.log('session', req.session, SESSION_DATA)
  //处理post,处理异步post
  bodypaser(req).then(body => {
    //写日志
    writeLog(`${new Date().toLocaleDateString()} -- ${req.path} -- ${req.method} -- ${req.headers['user-agent']}`)
    req.body = body
    //响应值也是一个promise
    //博客路由
    const blog = blogRouter(req, res)
    if (blog) { //说明命中路由
      blog.then(blog => {
        if (needCookie) {
          res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expires=${getExpires()}`)
        }
        res.end(JSON.stringify(blog))
      })
      return
    }

    //用户路由
    const user = userRouter(req, res)
    if (user) {
      user.then(users => {
        if (needCookie) {
          res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expires=${getExpires()}`)
        }
        res.end(JSON.stringify(users))
      })
      return
    }
    //兜底404
    res.writeHead('404', { 'Content-type': 'text/plain' })
    res.end('404 not found')
  })
}

module.exports = handleServer