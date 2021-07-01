//redis缓存数据到内存，小型的数据库，访问速度快
const redis = require('redis')
const { REDIS_PORT, REDIS_HOST } = require('../config/redis')
const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)

redisClient.on('error', function (err) {
  console.error(err)
})

function set (key, val) {
  if (val && typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

function get (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, function (err, val) {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      //处理一下val
      if(val === null){
        resolve(null)
        return
      }
      try{
        resolve(JSON.parse(val))
      }catch(e){
        resolve(val)
      }
      console.log(val)
    })
  })
}

module.exports = {
  get,
  set
}
