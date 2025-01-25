/**
 * Koa重构，分模块处理，根据功能存放在controllers目录下
 */
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const controller = require('./controller')(router)

app.use(static(__dirname+'/'));
app.use(bodyParser());
app.use(router.routes())

app.listen(3000, ()=>{
    console.log('Listening port 3000');
})