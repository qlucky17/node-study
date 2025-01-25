const run = require('./01-run');

// 使用process进行输入输出交互
var a,b;
process.stdout.write('请输入a的值：');
process.stdin.resume(); // 恢复标准输入流（stdin）的数据读取
process.stdin.on('data', function(chunk){
	if(!a){
		a = Number(chunk);
		process.stdout.write('请输入b的值：');
	} else{
		b = Number(chunk);
		var result = run.sum(a,b);
		process.stdout.write('a+b=' + result);
		process.exit();
	}
});
process.on('exit', function(code){
	console.log('exit', code);
});

// 通过process可以查询操作系统的一些有用信息
console.table([
	process.arch,
	process.platform,
	process.memoryUsage(),
	process.argv,
]);