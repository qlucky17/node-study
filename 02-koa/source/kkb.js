const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class KKB{
    // use(callback){
    //     this.callback = callback;
    // }
    constructor(){
        this.middlewares = [];
    }
    use(middleware){
        this.middlewares.push(middleware);
    }
    listen(...args){
        const server = http.createServer(async (req, res)=>{
            // this.callback(req,res);

            // 创建上下文, 把res和req都挂载到ctx之上
            // let ctx = this.createContext(req, res);
            // this.callback(ctx);
            // res.end(ctx.body);

            // 使用中间件，解决多个use
            let ctx = this.createContext(req, res);
            let fn = this.compose(this.middlewares);
            await fn(ctx);
            res.end(ctx.body);
        })
        server.listen(...args);
    }
    createContext(req, res){
        let ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);
        ctx.request.req = req;
        ctx.response.res = res;
        return ctx;
    }
    compose(middlewares) {
        return function (ctx) {
            return dispatch(0)
            function dispatch(i) {
                let fn = middlewares[i]
                if (!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(
                    fn(ctx, function next() {
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }
}

module.exports = KKB;
