/**
 * EventEmitter的使用
 */
const {EventEmitter} = require('events')

const event = new EventEmitter()
event.on('some_event', num=>{
    console.log('some_event:'+num);
})

let num = 0;
setInterval(()=>{
    event.emit('some_event', num++);
}, 1000);