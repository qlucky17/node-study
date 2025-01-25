// const app = new (require('koa'))()
// const {initRouter} = require('./loader')

// app.use(initRouter().routes())
// app.listen(3000, ()=>{
//     console.log('Listening port 3000')
// })



// 封装成kkb
const KKB = require('./kkb')
const app = new KKB()
app.start(3000)