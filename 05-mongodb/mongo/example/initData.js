const mongodb = require('./db');

mongodb.once('connect', async ()=>{
    const fruits = mongodb.col('fruits');
    await fruits.deleteMany();
    const data = new Array(100).fill().map((v,i)=>{
        return {
            name: 'xxxxx'+i,
            price: i,
            category: Math.random()>0.5 ? '蔬菜' : '水果'
        }
    });
    await fruits.insertMany(data);
    console.log('插入数据成功！');
})