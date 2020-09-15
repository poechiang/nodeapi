export default {
  host: 'localhost', // 主机地址 （默认：localhost）
  user: 'root', // 用户名
  password: 'poe@0688800', // 密码
  database: 'blog', // 数据库名
  port: 3306, // 端口号 （默认：3306）
  charset: 'UTF8_GENERAL_CI', // 连接字符集（默认：'UTF8_GENERAL_CI'，注意字符集的字母都要大写）
  localAddress: '', // 此IP用于TCP连接（可选）
  socketPath: '', // 连接到unix域路径，当使用 host 和 port 时会被忽略
  timezone: 'LOCAL', // 时区（默认：'local'）
  connectTimeout: 0, // 连接超时（默认：不限制；单位：毫秒）
  stringifyObjects: false, // 是否序列化对象
  typeCast: true, // 是否将列值转化为本地JavaScript类型值 （默认：true）
  queryFormat: null, // 自定义query语句格式化方法
  supportBigNumbers: false, // 数据库支持bigint或decimal类型列时，需要设此option为true （默认：false）
  bigNumberStrings: false, // supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认：false）
  dateStrings: '', // 强制timestamp,datetime,data类型以字符串类型返回，而不是JavaScript Date类型（默认：false）
  debug: false, // 开启调试（默认：false）
  multipleStatements: false, // 是否许一个query中有多个MySQL语句 （默认：false）
  flags: null, // 用于修改连接标志
  ssl: false // 使用ssl参数（与crypto.createCredenitals参数格式一至）或一个包含ssl配置文件名称的字符串，目前只捆绑Amazon RDS的配置文件
}
