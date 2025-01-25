/**
 * koa中使用redis存储session
 */
const koa = require('koa')
const app = new koa()
const session = require('koa-session')
const redis = require('redis')
const redisStore = require('koa-redis')
const wrapper = require('co-redis')

const redisClient = redis.createClient(6379, 'localhost')
const client = wrapper(redisClient)

app.keys = ['some secret']  //签名key keys作用:用来对cookie进行签名
const SESS_CONFIG = {
    key: 'kkb:sess',
    maxAge: '86400000',
    httpOnly: true,
    // signed: false
    signed: true,  //避免客户端修改sid
    store: redisStore({client})  //此处可以不必指定client 
}
// 注册
app.use(session(SESS_CONFIG, app))

app.use(async (ctx, next)=>{
    const keys = await client.keys('*');
    keys.forEach(async key=>{
        console.log(await client.get(key))
    })
    await next();
})

app.use((ctx,next)=>{
    if(ctx.path==='/favicon.ico') return
    let n = ctx.session.count || 0;
    ctx.session.count = ++n;
    ctx.body = `第${n}次访问`
})

app.listen(3000, ()=>{
    console.log('Listening port 3000')
});