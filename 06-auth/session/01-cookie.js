// cookie原理解析
const http = require('http')
http.createServer((req,res)=>{
    if(req.url==='./favivon.ico'){
        res.end('')
    }
    console.log(req.headers.cookie);
    res.setHeader('Set-Cookie', 'coco=abc');
    res.end('hello, cookie');
}).listen(3000, ()=>{
    console.log('Listening port 3000')
})