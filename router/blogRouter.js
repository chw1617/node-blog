//只关心路由
const { successModel, errorModel } = require('../model/resModel')
const {
  blogList,
  blogDetail,
  blodNew,
  blogUpdate,
  blogDel,
} = require('../controller/blogController')

//登录验证
function checkLogin (req) {
  if (!req.session.username) {
    return Promise.resolve(new successModel('尚未登录！'))
  }
}

function blogRouter (req, res) {
  const method = req.method
  const id = req.query.id || ''
  //列表接口
  if (method == 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    return blogList(author, keyword).then(data => {
      return new successModel(data)
    })
  }
  //详情接口
  if (method == 'GET' && req.path === '/api/blog/detail') {
    return blogDetail(id).then(data => {
      return new successModel(data)
    })
  }
  //新增接口
  if (method == 'POST' && req.path === '/api/blog/new') {
    const checkResult = checkLogin(req)
    if (checkResult) {
      return checkResult
    }
    return blodNew(req.body).then(data => {
      return new successModel(data)
    })
  }

  //更新接口
  if (method == 'POST' && req.path === '/api/blog/update') {
    const checkResult = checkLogin(req)
    if (checkResult) {
      return checkResult
    }
    return blogUpdate(id, req.body).then(res => {
      if (res) {
        return new successModel('更新成功')
      } else {
        return new errorModel('更新失败')
      }
    })
  }

  //删除接口
  if (method == 'POST' && req.path === '/api/blog/del') {
    const checkResult = checkLogin(req)
    if (checkResult) {
      return checkResult
    }
    //应该需要应该是不是用户本身操作
    const author = res.session.username
    return blogDel(id, author).then(res => {
      if (res) {
        return new successModel('删除成功')
      } else {
        return new errorModel('删除失败')
      }
    })
  }

}
module.exports = blogRouter