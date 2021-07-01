function bodyParse (req) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let body = ''
    req.on('data', chunk => {
      body += chunk
    })
    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }
      resolve(JSON.parse(body))
    })
  })
}

module.exports = bodyParse