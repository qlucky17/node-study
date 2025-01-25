/**
 * 聊天室
 * 客户端通过telnet localhost 7000连接
 */
const net = require('net')
const chartServer = net.createServer();
let clientList = [];
chartServer.on('connection', client=>{
    client.write(`Connected\n`);
    clientList.push(client);
    client.on('data', data=>{
        clientList.forEach(item=>{
            item.write(data);
        })
    })
})
chartServer.listen(3000, ()=>{
    console.log('Listening Port 3000');
})