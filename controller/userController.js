const exec = require('../db/sql')
function checkLogin (user, pass) {
  const sql = `select * from user where username='${user}' and password='${pass}'`
  return exec(sql).then(res => {
    console.log('login', res)
    if (res.length) {
      return true
    }
    return false
  })

}

module.exports = {
  checkLogin
}