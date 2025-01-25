/**
 * Koa简单使用(1)
 */

const Koa = require('koa');
const app = new Koa();
// app.use(async (ctx,next)=>{
//     if(await checkUserPermission()){
//         await next();
//     } else{
//         ctx.response.status = 403;
//     }
// })
app.use(async (ctx,next)=>{
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello Node</h1>';
    await next();
    console.log('1')
})
app.use((ctx, next)=>{
    console.log('2');
})
app.listen(3000, ()=>{
    console.log('Listening port 3000');
})