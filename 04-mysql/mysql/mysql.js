const mysql = require('mysql')

// 连接配置
const cfg = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'kkb'
}
// 创建连接对象
const connection = mysql.createConnection(cfg);
connection.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log("连接成功！");
    }
})

// 数据库操作
const CREATE_TABLE = 
    `CREATE TABLE IF NOT EXISTS test (
        id INT NOT NULL AUTO_INCREMENT,
        message VARCHAR(45) NULL,
    PRIMARY KEY (id))`;
const INSERT_TABLE = `INSERT INTO test(message) VALUES(?)`;
const SELECT_TABLE = `SELECT * FROM test`
connection.query(CREATE_TABLE, err=>{
    if(err){
        throw err;
    }
    connection.query(INSERT_TABLE, 'hello world', (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        connection.query(SELECT_TABLE, (err, results)=>{
            console.log(results);
            connection.end();
        })
    })
})