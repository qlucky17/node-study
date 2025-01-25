/** 
 * session-cookie原理解析, 使用cookie鉴权不安全=>使用session-cookie
*/
const http = require('http')

const session = {};
http.createServer((req,res)=>{
    if(req.url==='./favivon.ico'){
        res.end('')
    }
    const sessionKey = 'sid';
    const cookie = req.headers.cookie;
    if(cookie && cookie.indexOf(sessionKey)>-1){
        // // 取出session数据
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
        const sid = pattern.exec(cookie)[1];
        console.log('session', sid, session[sid]);
        res.end('cookie exist');
    } else{
        const sid = (Math.random()*999999999).toFixed();
        res.setHeader('Set-Cookie', `${sessionKey}=${sid}`); 
        // 设置session数据
        session[sid] = {name: 'laowang'};

        res.end('cookie not exist');
    }
}).listen(3000, ()=>{
    console.log('Listening port 3000')
})