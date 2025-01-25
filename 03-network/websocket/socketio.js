// 实现websocket消息推送
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/receive', function(req, res){
    res.sendFile(__dirname + '/receive.html');
});

io.on('connection', function(socket){
    console.log('Websocket Connected!');

    //响应某用户发送的消息
    socket.on('chat message', function(msg){
        console.log('接收到消息：' + msg);

        // 广播给所有人
        io.emit('chat message', msg);
        // 广播给除了发送者外所有人
        // socket.broadcast.emit('chat message', msg);

        socket.on('disconnect', function(){
            console.log('Websocket Disconnected!');
        });
    })
})

http.listen(3000, function(){
    console.log('listening on *:3000');
});