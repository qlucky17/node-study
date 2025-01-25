// ES2017写法(推荐)
(async ()=>{
    // 数据库连接
    const mysql = require('mysql2/promise')
    const cfg = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'kkb'
    }
    const connection = await mysql.createConnection(cfg);

    // 数据库操作
    const CREATE_TABLE = 
        `CREATE TABLE IF NOT EXISTS test (
            id INT NOT NULL AUTO_INCREMENT,
            message VARCHAR(45) NULL,
        PRIMARY KEY (id))`;
    const INSERT_TABLE = `INSERT INTO test(message) VALUES(?)`;
    const SELECT_TABLE = `SELECT * FROM test`;
 
    let ret = await connection.execute(CREATE_TABLE);
    // console.log('create', ret)
    
    ret = await connection.execute(INSERT_TABLE, ['ABC']);
    // console.log('insert:', ret)

    ret = await connection.execute(SELECT_TABLE);
    console.log(JSON.stringify(ret[0]))

    connection.end()
})()