// module.exports = {
//     'get /': async ctx=>{
//         ctx.body = '首页'
//     },
//     'get /detail': ctx=>{
//         ctx.body = '详情页'
//     }
// }



// 加入controller层后
module.exports = app => ({
    'get /': app.$ctrl.index.index,
    'get /detail':app.$ctrl.index.detail
})