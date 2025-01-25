
process.on('message', (msg) => {
  console.log('子进程接收消息：', msg);
  setTimeout(() => {
    process.send('执行结束');
  }, 2000);
});
