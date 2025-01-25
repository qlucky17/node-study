const koa = require('koa')
const app = new koa()
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')

app.use(bodyParser())
app.use(static(__dirname+'/'))

// 加载数据库，自动加载model目录下的schema并创建model
const {loadModel} = require('./framework/loader')
loadModel(app);

const restful = require('./framework/router')
app.use(restful)

app.listen(3000, ()=>{
    console.log('Listening port 3000')
})