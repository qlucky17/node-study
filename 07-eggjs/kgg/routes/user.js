// module.exports = {
//     'get /': async ctx=>{
//         ctx.body = '用户首页'
//     },
//     'get /detail': ctx=>{
//         ctx.body = '用户详情页'
//     }
// }


// 加入service层后
module.exports = {
    'get /': async app=>{
        const name = await app.$service.user.getName();
        app.ctx.body = '用户'+name;
    },
    'get /detail': app=>{
        app.ctx.body = '用户详情页'+app.$service.user.getAge();
    }
}
