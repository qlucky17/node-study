const index = async (ctx, next)=>{
    ctx.body = '<h1>user page</h1>'
}
const getUserDetail = async (ctx, next)=>{
    ctx.body = `getUserId: ${ctx.params.name.id}`;
}

module.exports = {
    'GET /user': index,
    'POST /user/:id': getUserDetail
}