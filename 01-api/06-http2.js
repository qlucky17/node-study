const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    const {url, method, headers} = req;
    // console.log(url, method, headers);
    if(url==='/' && method==='GET'){
        // 静态页面服务
        fs.readFile('./data/index.html', (err, data)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        })
    } else if(method==='GET' && headers.accept.indexOf('image/*')!==-1){
        // 图片文件
        fs.createReadStream('./data'+url).pipe(res);
    } else if(url==='/users' && method==='GET'){
        // Ajax服务
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
            name: 'admin'
        }))
    }
})

server.listen(3000)
console.log('Listening port 3000')