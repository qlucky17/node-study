/**
 * 爬虫
 * 原理：服务端模拟客户端发送请求到⽬标服务器获取⻚⾯内容并解析，获取其中关注部分的数据。
 */
const originRequest = require('request')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const cProcess = require('child_process')
const path = require('path')

function request(url, callback){
    const options = {
        url,
        encoding: null
    };
    originRequest(url, options, callback);
}

function alertMessage(msg){
    const vbsPath = path.join(__dirname, 'vb.message.vbs');
    cProcess.exec('cscript.exe ' + vbsPath + ' "提示" "'+msg+'"', function(err, stdout, stderr){
        if(err){
            fs.writeFileSync('error.log', err.toString())
        }
    })
}

for(let i=100553; i<100563; i++){
    const url = `https://www.dy2018.com/i/${i}.html`;
    request(url, function(err, res, body){
        const html = iconv.decode(body, 'gb2312');
        const $ = cheerio.load(html);
        console.log(`${i}：` + $('.title_all h1').text());
        if(i==100555){
            alertMessage('结束！');
        }
    })
}
