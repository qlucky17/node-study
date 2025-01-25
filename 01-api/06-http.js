const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')
let server = http.createServer((req, res)=>{
	var requestUrl = url.parse(req.url);
	switch(requestUrl.pathname){
		case '/':
		case '/index':
			sendData('./data/index.html', req, res);
			break;
		case '/login':
			sendData('./data/login.html', req, res);
			break;
		case '/login/submit':
			if(req.method.toUpperCase() == 'GET'){
				var query = qs.parse(requestUrl.query);
				if(query.username == 'test' && query.password == '123456'){
					sendData('./data/index.html', req, res);
				} else {
					console.log('用户名或密码错误!');
					sendData('./data/login.html', req, res);
				}
			}
			break;
		default:
			res.writeHead(400, {
				'Content-Type': 'text/html;charset=utf-8'
			});
			res.write('<h1 style="text-align:center">您查找的页面不存在~</h1>');
			res.end();
			break;
	}
})
server.listen(3000);
server.on('listening', function(){
	console.log('Listening port 3000...')
})
server.on('error', function(){
	console.log('server error!')
})

function sendData(file, req, res){
	fs.readFile(file, (err, data)=>{
		if(err){
			res.writeHead(404, {
				'Content-Type': 'text/html;charset=utf-8'
			})
			res.end('<div>404页面出错啦~</div>');
		} else{
			res.writeHead(200, {
				'Content-Type': 'text/html;charset=utf-8'
			})
			res.end(data);
		}
	});
}