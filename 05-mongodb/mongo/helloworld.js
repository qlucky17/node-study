(async ()=>{
    const {MongoClient: MongoDB} = require('mongodb')
    // 创建客户端并连接
    const client = new MongoDB('mongodb://localhost:27017', {
        userNewUrlParser: true
    })
    await client.connect();
    console.log('Mongodb连接成功！')

    const db = client.db('kkb')
    const fruits = db.collection('fruits');

    // 删除
    await fruits.deleteMany();

    // 添加
    let ret = await fruits.insertOne({
        name: '苹果',
        price: 20.1
    })
    console.log('插入：' + JSON.stringify(ret))

    // 查询
    ret = await fruits.findOne();
    console.log('查询：', JSON.stringify(ret));

    // 更新
    ret = await fruits.updateOne({name: '苹果'}, {
        $set: {name: '芒果', price: 22.2}
    })
    console.log('更新：', JSON.stringify(ret));
})()