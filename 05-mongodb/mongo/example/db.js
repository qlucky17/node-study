const {EventEmitter} = require('events') //数据库连接是异步的，程序创建也是异步的，EventEmitter可以使两者之间进行通讯
const {MongoClient} = require('mongodb')

const dbConfig = {
    url: 'mongodb://localhost:27017',
    dbName: 'kkb'
}
class Mongodb{
    constructor(conf){
        this.emitter = new EventEmitter();
        this.conf = conf;
        this.client = new MongoClient(conf.url, {
            useNewUrlParser: true
        })
        this.client.connect(err=>{
            if(err) throw err;
            console.log('MongoDB连接成功！');
            this.emitter.emit('connect');
        })
    }
    // 返回collection对象(也就是表结构))
    col(colName, dbName=this.conf.dbName){
        return this.client.db(dbName).collection(colName);
    }
    once(event, cb){
        this.emitter.once(event, cb);
    }
}
module.exports = new Mongodb(dbConfig)