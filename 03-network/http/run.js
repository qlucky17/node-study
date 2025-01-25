const server1 = require('./http.js')
const server2 = require('./proxy.js')

server1.listen(3000, ()=>{
    console.log('Listening Port 3000');
});
server2.listen(4000, ()=>{
    console.log('Listening Port 4000');
});