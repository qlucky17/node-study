// 实现一个文件系统读写数据库
const fs = require('fs')

function get(key){
    fs.readFileSync('./db.json', (err, data)=>{
        const jsonData = JSON.parse(data);
        console.log(jsonData[key]);
    })
}

function set(key, value){
    fs.readFile('./db.json', (err, data)=>{
        const jsonData = data ? JSON.parse(data) : {};
        jsonData[key] = value;
        fs.writeFile('./db.json', JSON.stringify(jsonData), err=>{
            if(err){
                console.log(err);
            }
            console.log('写入成功！');
        })
    })
}

// 命令行接口方式
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', function(input){
    const [opt, key, value] = input.split(" ");
    switch(opt){
        case 'get':
            get(key);
            break;
        case 'set':
            set(key, value);
            break;
        case 'quit':
            rl.close();
            break;
        default:
            console.log('没有该操作');
    }
})
rl.on('close', function(){
    console.log("程序结束");
    process.exit(0);
})