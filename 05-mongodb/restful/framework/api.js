module.exports = {
    async init(ctx, next){
        console.log('获取动态路由参数：',ctx.params);
        const model = ctx.app.$model[ctx.params.model];
        if(model){
            ctx.model = model;
            await next();
        } else{
            ctx.body = 'no this model';
        }
    },
    async get(ctx){
        const res = await ctx.model.find({});
        ctx.body = res;
    },
    async create(ctx){
        const res = await ctx.model.create(ctx.request.query)
        ctx.body = res;
    },
    async update(ctx){
        ctx.body = await ctx.model.updateOne({ _id: ctx.params.id}, ctx.request.query);
    },
    async del(ctx){
        ctx.body = await ctx.model.deleteOne({_id: ctx.params.id});
    },
    async page(ctx){
        ctx.body = await ctx.model.find({})
    }
}