const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const config = require('../config')

function load(dir, cb){
    const url = path.resolve(__dirname, dir);
    const files = fs.readdirSync(url);
    // console.log(url, files);
    files.forEach(filename=>{
        // 去掉后缀名
        filename = filename.replace('.js', '');
        // 导入文件
        const file = require(url+'/'+filename);
        cb(filename, file);
    })
}
function loadModel(app){
    mongoose.connect(config.db.url, config.db.options);
    const conn = mongoose.connection;
    conn.on('error', ()=>{
        console.log('Mongodb连接失败！');
    })
    app.$model = {};
    conn.on('open', ()=>{
        load('../model', (filename, {schema})=>{
            app.$model[filename] = mongoose.model(filename, schema);
            console.log('加载数据库模块：',filename);
        });
    })
}
module.exports = {
    loadModel
}
