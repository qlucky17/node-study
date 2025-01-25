// Koa源码解析

// 一、原生http
/*const http = require('http')
const server = http.createServer((req, res)=>{
    res.writeHead(200);
    res.end(`hi koa`);
})

server.listen(3000, ()=>{
    console.log('Listening port 3000');
})*/


//  二、使用koa
/*const KKB = require('./kkb')
const app = new KKB()
app.use((req, res)=>{
    res.writeHead(200);
    res.end('hi koa');
})
app.listen(3000, ()=>{
    console.log('Listening port 3000');
})*/


//  三、将req,res封装到ctx中
/*const KKB = require('./kkb')
const app = new KKB()
app.use(ctx=>{
ctx.body = 'hi kkk';
})
app.listen(3000, ()=>{
    console.log('Listening port 3000');
})*/


 //  四、middlewares, 使用多个use
/*const KKB = require('./kkb')
const app = new KKB()
const delay = () => Promise.resolve(resolve => setTimeout(() => resolve(), 2000));

 app.use(async (ctx, next) => {
    ctx.body = "1";
    setTimeout(() => {
        ctx.body += "2";
    }, 2000);
    await next();
    ctx.body += "3";
});

app.use(async (ctx, next) => {
    ctx.body += "4";
    await delay();
    await next();
    ctx.body += "5";
});

app.use(async (ctx, next) => {
    ctx.body += "6";
});

app.listen(3000, ()=>{
    console.log('Listening port 3000');
})*/


//  五、router分模块处理
const KKB = require('./kkb')
const app = new KKB()
const static = require('./static')
app.use(static(__dirname + '/public'));

const Router = require('./router')
const router = new Router()

router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });

// 路由实例输出父中间件 router.routes()
app.use(router.routes());
app.listen(3000)