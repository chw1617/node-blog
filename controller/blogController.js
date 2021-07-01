//控制层只关心数据的操作
const exec = require('../db/sql')
function blogList (author, keyword) {
  const sql = "select * from blog"
  //这里是异步
  return exec(sql)
}

function blogDetail (id) {
  const sql = `select * from blog where id=${id}`
  return exec(sql).then(detail => {
    return detail[0]
  })
}

function blodNew (data = {}) {
  const { title, content, author } = data
  const createTime = Date.now()
  const sql = `insert into blog (title,content,author,create_time) values 
  ('${title}','${content}','${author}','${createTime}')`
  return exec(sql).then(res => {
    console.log('add', res)
    return res.insertId
  })
}

function blogUpdate (id, data) {
  const { title, content } = data
  const sql = `update blog set title='${title}',content='${content}' where id =${id}`
  return exec(sql).then(update => {
    console.log('update', update)
    if (update.affectedRows >= 1) {
      return true
    } else {
      return false
    }
  })
}

function blogDel (id, author) {
  //需要验证用户是不是自己
  const sql = `delete from blog where id=${id} and auther=${author}`
  return exec(sql).then(del => {
    console.log('del', del)
    if (del.affectedRows >= 1) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  blogList,
  blogDetail,
  blodNew,
  blogUpdate,
  blogDel
}