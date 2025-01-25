const index = async (ctx, next)=>{
    ctx.body = '<h1>home page</h1>'
}
const getDetail = async (ctx, next)=>{
    ctx.body = 'detail';
}

module.exports = {
    'GET /': index,
    'GET /detail': getDetail
}