const mysql = require("mysql2/promise");
// 创建一个链接池,解决大量资源占用问题
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "company",
  waitForConnections: true, //是否需要等待
  connectionLimit: 10, //最大链接数量
  queueLimit: 0, //最多可以排队多长，0代表不限制
  multipleStatements: true, //可以执行多条语句
});
async function test2(name) {
  const sql = "select * from company where name like concat('%',?,'%');"
  const [results] = await pool.execute(sql, [name])
  console.log(results)
}
// 异步函数
async function test(id) {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "12345678",
  //   database: "company",
  //   multipleStatements: true, //可以执行多条语句
  // });


  // const [results] = await connection.query("delete from company where id=4")
  // console.log(results)
  const sql = "select * from company where id=?;"
  const [results] = await connection.execute(sql, [id])
  console.log(results)
  connection.end()
}
test2('')
// test('2')
// 同步语句
function test1() {
  // const mysql = require("mysql2");
  // 创建一个数据库连接
  // const connection = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "12345678",
  //   database: "company",
  // });
  // connection.query("insert into company(`name`,location,buildDate) values('abc','beijing',curdate());", function (err, results) {
  //   //err错误
  //   //result查询结果
  //   console.log(results); // results contains rows returned by server
  // });

}
