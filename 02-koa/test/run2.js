/**
 * Koa简单使用(2)
 */

const Koa = require('koa')
const app = new Koa()
// const Router = require('koa-router')
// const router = new Router()
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')

app.use(static(__dirname+'/'));
app.use(bodyParser());
// app.use(router.routes())
app.use(router.routes()).use(router.allowedMethods()) //官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header

// 路由拦截判断
app.use(async (ctx,next)=>{
    await next();
})

router.get('/', async (ctx,next)=>{
    console.log('get:', ctx.request.query, ctx.request.querystring);
    ctx.body = 
        `<form action="/user" method="post">
            <div>用户名：<input type="text" name="username" /></div>
            <div>密码：<input type="password" name="password" /></div>
            <button>提交</button>
        </form>`;
})

router.post('/user', async (ctx,next)=>{
    console.log('post:', ctx.request.body);
    ctx.body = {
        status: 1000,
        data: {name: 'admin', role: ['admin', 'test']},
        message: '操作成功'
    }
})

router.get('/user/:id', async(ctx,next)=>{
    console.log(ctx.params.id);
})

app.listen(3000, ()=>{
    console.log('Listening port 3000');
})