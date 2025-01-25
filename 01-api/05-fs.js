
/**
 * 在当前目录下创建文件夹data,并在文件夹data下新建hello.txt文件
 */
const fs = require("fs");

// 创建目录
fs.exists('./data', function(isExist){
	if(!isExist){
		fs.mkdirSync('./data', (err)=>{
			if(err){
				console.log('创建目录失败：' + err);
			} else{
				console.log('创建目录成功！');	
			}
		})
	} else{
		console.log('路径已存在！');
	}
});

// 创建文件
var fileName = './data/hello.txt';
fs.writeFile(fileName, 'hello node', (err)=>{
	if(err){
		console.log('创建文件失败：' + err);
	} else{
		console.log('创建文件成功！');
	}
})


// 读取文件(同步)
var cont = fs.readFileSync('./data/readme.md');
console.log(cont.toString());

// 读取文件(异步)
var cont = fs.readFile('./data/readme.md', (err, data)=>{
	if(err){
		throw err;
		return;	
	}
	console.log(data.toString());
});