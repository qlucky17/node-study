// 为什么使用bodyParser
const koa = require('koa')
const app = new koa()
app.use(require('koa-static')(__dirname+'/'))

// 未使用bodyParser时：
// app.use((ctx, next)=>{
//     const req = ctx.request.req;
//     let reqData = [];
//     let size = 0;
//     req.on('data', data=>{
//         console.log(`request on: ${data}`);
//         reqData.push(data);
//         size+=data.length;
//     })
//     req.on('end', function(){
//         console.log('end');
//         const data = Buffer.concat(reqData, size);
//         console.log(`data: ${data.toString()}`);
//     })
// })

// 使用bodyParser：
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use((ctx, next)=>{
    const reqData = ctx.request.body;
    console.log(reqData);
})

app.listen(3000, ()=>{
    console.log('Listening Port 3000');
})
