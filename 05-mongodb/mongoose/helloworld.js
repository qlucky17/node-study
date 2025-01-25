const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/kkb', {
    useNewUrlParser: true
})

const conn = mongoose.connection;
conn.on('error', ()=>{
    console.error('连接失败！')
})
conn.on('open', async ()=>{
    // 定义一个schema(表)
    const Schema = mongoose.Schema({
        name: String,
        category: String
    })
    const Model = mongoose.model('fruits', Schema);

    // 添加
    let ret = await Model.create({
        name: '苹果',
        category: '水果'
    })
    console.log('插入成功：', ret); 

    // 查询，find返回Query，它实现了了then和catch，可以当Promise使⽤
    // 如果需要返回Promise，调⽤用其exec()
    ret = await Model.find({name: '苹果'});
    console.log('查询：', ret); 

    // 更新
    ret = await Model.updateOne({name: '苹果'}, {
        $set: {name: '芒果'}
    })
    console.log('更新：', ret);

    // 删除
    ret = await Model.deleteOne({name: '苹果'});
    console.log('删除：', ret);
})