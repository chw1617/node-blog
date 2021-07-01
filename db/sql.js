const mysql = require('mysql2')
const mysqlConfig = require('../config/db')

//创建数据库
const db = mysql.createConnection(mysqlConfig)

//连接
db.connect()

/*
* sql语句封装
* return promise
*/
function exec (sql) {
  const promise = new Promise((resolve, reject) => {
    db.query(sql, (err, data) => {
      if (err) {
        reject(err)
        console.log('err', err)
      }
      resolve(data)
    })
  })
  return promise
}

module.exports = exec