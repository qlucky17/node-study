const Koa = require('koa')
const {initRouter, initController, initService, loadConfig, initSchedule} = require('./loader')

class kkb{
    constructor(conf){
        // this.$app = new Koa(conf);
        // this.$router = initRouter();
        // this.$app.use(this.$router.routes());


        // 加入controller层
        // this.$app = new Koa(conf);
        // this.$ctrl = initController()
        // this.$router = initRouter(this);
        // this.$app.use(this.$router.routes());


        // 加入service层
        // this.$app = new Koa(conf);
        // this.$service = initService();
        // this.$ctrl = initController(this);
        // this.$router = initRouter(this);
        // this.$app.use(this.$router.routes());


        // 加入数据库
        this.$app = new Koa(conf);
        loadConfig(this);
        this.$service = initService();
        this.$ctrl = initController(this);
        this.$router = initRouter(this);
        this.$app.use(this.$router.routes());
        
        // 批处理
        initSchedule();
    }
    start(port){
        this.$app.listen(port, ()=>{
            console.log('Listening port '+port);
        })
    }
}
module.exports = kkb;