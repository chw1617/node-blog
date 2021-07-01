//本地环境，线上环境需要做不同的配置
//应该判断环境变量process.env.NODE_ENV
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'chwcan131477',
  port: 3306,
  database: 'blog',
}
module.exports = mysqlConfig