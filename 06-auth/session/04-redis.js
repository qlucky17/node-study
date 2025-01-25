// 使用redis存储session
const redis = require('redis')

const client = redis.createClient(6379, 'localhost');
client.set('hello', 'this is a value');
client.get('hello', function(err,v){
    console.log('redis get:' + v);
}) 