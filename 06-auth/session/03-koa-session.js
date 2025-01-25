/**
 * koa中使用session
 */
const koa = require('koa')
const app = new koa()
const session = require('koa-session')

app.keys = ['some secret']  //签名key keys作用:用来对cookie进行签名
const SESS_CONFIG = {
    key: 'kkb:sess',
    maxAge: '86400000',
    httpOnly: true,
    // signed: false
    signed: true  //避免客户端修改sid
}
// 注册
app.use(session(SESS_CONFIG, app))

app.use((ctx,next)=>{
    if(ctx.path==='/favicon.ico') return
    let n = ctx.session.count || 0;
    ctx.session.count = ++n;
    ctx.body = `第${n}次访问`
})

app.listen(3000, ()=>{
    console.log('Listening port 3000')
});