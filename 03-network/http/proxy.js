// const express = require('express')
// const app = express()

// app.use(express.static(__dirname+'/'));         //只提供静态资源文件
// module.exports = app




// 使用proxy解决跨域问题
const express = require('express')
const app = express()
const proxy = require('http-proxy-middleware')

app.use(express.static(__dirname+'/'));         //只提供静态资源文件
app.use('/api', proxy({
    target: 'http://localhost:3000',
    changeOrigin: false
}))
module.exports = app