//响应数据模型
class baseModel {
  constructor(data, message) {
    if (typeof data == 'string') {
      this.message = data
      return
    }
    this.data = data
    this.message = message
  }
}

class successModel extends baseModel {
  constructor(data, message) {
    super(data, message)
    this.code = 1
  }
}


class errorModel extends baseModel {
  constructor(data, message) {
    super(data, message)
    this.code = 0
  }
}

module.exports = {
  successModel,
  errorModel
}