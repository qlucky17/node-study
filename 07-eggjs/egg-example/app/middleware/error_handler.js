module.exports = (option, app)=>{
    return async function(ctx, next){
        try {
            await next();
        } catch(err){
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            app.emit('error', err, this);
            const status = err.status || 500;
            // 判断生产环境
            const error = status===500 && app.config.env==='prod' ? 'Internal Server Error' : err.message;
            ctx.body = {
                code: status,
                error
            }
            if(status===422){ //用户定义错误
                ctx.body.detail = err.errors;
            }
            ctx.status = 200;
        }
    }
}