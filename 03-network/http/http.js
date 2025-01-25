const http = require('http')
const fs = require('fs')
const path = require('path')

const httpServer = http.createServer((req,res)=>{
    const {url, method} = req;
    // console.log(url,method);
    console.log(req.headers.cookie);
    if(method=='GET' && url=='/'){
        fs.readFile(path.resolve(__dirname+'/index.html'), (err, data)=>{
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(data);
        })
    } 
    else if((method=='GET' || method=='POST') && url=='/api/users'){
        res.setHeader('Content-Type', 'application/json');      
        // 设置允许跨域
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
        // 设置Cookie允许跨域
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Set-Cookie', 'coco=123456');
        res.end(JSON.stringify({'name': 'Tom', age: 20}))
    } 
    else if(method=='OPTIONS' && url=='/api/users'){
        // 处理CORS预检请求
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        // res.writeHead(200, {
        //     "Access-Control-Allow-Origin": "http://localhost:4000",
        //     "Access-Control-Allow-Headers": "X-Token,Content-Type",
        //     "Access-Control-Allow-Methods": "PUT"
        // });
        res.end();
    }
})
module.exports = httpServer;