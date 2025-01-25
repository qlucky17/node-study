// module.exports = {
//     index: async ctx => {
//         ctx.body = '首页Ctrl'
//     },
//     detail: async ctx => {
//         ctx.body = '详情页Ctrl'
//     }
// }


// 加入service层后
module.exports = {
    index: async app => {
        // app.ctx.body = '首页Ctrl'
        app.ctx.body = await app.$model.user.findAll();
    },
    detail: async app => {
        app.ctx.body = '详情页Ctrl'
    }
}