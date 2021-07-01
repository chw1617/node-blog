function cookieParse (req) {
  const cookie = req.headers.cookie || ''
  const res = {}
  cookie.split(';').forEach(item => {
    if (!item) {
      return
    }
    const [key, val] = item.split('=')
    if (key && val) {
      res[key] = val.trim()
    }
  })
  return res
}

module.exports = cookieParse