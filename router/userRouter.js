
const { checkLogin } = require('../controller/userController')
const { successModel, errorModel } = require('../model/resModel')
//cookie增加httponly 不让前端操作
//cookire增加过期时间，防止关闭页面就丢失
const getExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

function userRouter (req, res) {
  if (req.method === 'POST' && req.path === '/api/user/login') {
    const { user, pass } = req.body
    return checkLogin(user, pass).then(val => {
      if (val) {
        //写入cookie
        // res.setHeader('Set-Cookie', `user=${user};path=/;httpOnly;expires=${getExpires()}`)
        req.session.username = user
        return new successModel('登录成功')
      } else {
        return new errorModel('登录失败')
      }
    })
  }
  // //登录验证
  // if (req.method === 'GET' && req.path === '/api/user/loging-test') {
  //   // if (req.cookie.user) {
  //   //   return Promise.resolve(new successModel('ok'))
  //   // } else {
  //   //   return Promise.resolve(new successModel('fail'))
  //   // }
  //   console.log('test-session', req.session)
  //   if (req.session.username) {
  //     return Promise.resolve(new successModel('ok'))
  //   } else {
  //     return Promise.resolve(new successModel('fail'))
  //   }
  // }
}
module.exports = userRouter