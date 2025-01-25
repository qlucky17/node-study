(async () => {
    // 数据库连接
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('kkb', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false
    })

    // 定义模型
    const Fruit = sequelize.define('Fruit', {
        name: { type: Sequelize.STRING(20), allowNull: false },
        price: { type: Sequelize.FLOAT, allowNull: false },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    });
    // 同步数据库，force: true则会删除已存在表
    // let ret = await Fruit.sync();
    let ret = await Fruit.sync({ force: true });
    console.log('sync: ', ret);

    ret = await Fruit.create({
        name: '香蕉',
        price: 3.5
    })
    console.log('create: ', ret);

    ret = await Fruit.findAll();
    await Fruit.update({
        price: 4
    }, {
        where: { name: '香蕉' }
    })
    console.log('findAll: ', JSON.stringify(ret));

    const op = Sequelize.Op;
    ret = await Fruit.findAll({
        // where: { 
        //     price: {[Op.lt]:4}, 
        //     stock: {[Op.gte]: 100 }
        // },
        where: {
            price: { [op.lt]: 4, [op.gt]: 2 }
        },
    })
    console.log('findAll', JSON.stringify(ret, '', '\t'));
})()