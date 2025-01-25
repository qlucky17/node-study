const fs = require('fs');
const cp = require('child_process');

// fs.writeFile('./data/test.txt', 'Hello World!', (err) => {
//   if(err){
//     console.log(err);
//     return;
//   }
//   cp.exec(`notepad ./data/test.txt`, (err, stdout, stderr) => {
//     if(err){
//       console.log(err);
//       return;
//     }
//   });
// });

// cp.execFile('notepad', function(err, stdout, stderr){
//   console.log('stdout: ', stdout);
//   console.log('stderr: ', stderr);
// });

// const netstat = cp.spawn('netstat', ['-an']);
// const echo = cp.spawn('cmd', ['echo']);
// netstat.stdout.pipe(echo.stdin);
// echo.stdout.pipe(process.stdout);

// cp.exec('echo | netstat -an', function(err, stdout, stderr){
//   console.log(stdout);
// });


const child = cp.fork('./child_process');
// child.send('father send msg');
child.send('开始执行...');
child.on('message', (msg) => {
  console.log('主进程接收消息：', msg);
});

