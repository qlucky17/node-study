const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

// 读取目录
function load(dir, cb){
    const url = path.resolve(__dirname, dir);
    const files = fs.readdirSync(url);
    files.forEach(filename=>{
        filename = filename.replace('.js', '');
        const file = require(url+'/'+filename);
        cb(filename, file);
    })
}

// function initRouter(){
//     const router = new Router();
//     load('routes', (filename, routes)=>{
//         const prefix = filename==='index' ? '' : `/${filename}`;
//         Object.keys(routes).forEach(key=>{
//             const [method,path]=key.split(' ');
//             router[method](prefix+path, routes[key]);
//         })
//     })
//     return router;
// }
// 加入controller层
function initRouter(app){
    const router = new Router();
    load('routes', (filename, routes)=>{
        const prefix = filename==='index' ? '' : `/${filename}`;
        routes = typeof routes === 'function' ? routes(app) : routes
        Object.keys(routes).forEach(key=>{
            const [method,path]=key.split(' ');
            // router[method](prefix+path, routes[key]);
            // 加入service层
            router[method](prefix+path, async ctx=>{
                app.ctx = ctx;
                await routes[key](app)
            })
        })
    })
    return router;
}

// function initController(){
//     const controllers = {};
//     load('controller', (filename, controller)=>{
//         controllers[filename] = controller;
//     })
//     return controllers;
// }
// 加入service层
function initController(){
    const controllers = {};
    load('controller', (filename, controller)=>{
        controllers[filename] = controller;
    })
    return controllers;
}

function initService(){
    const services = {};
    load('service', (filename, service)=>{
        services[filename] = service;
    })
    return services;
}

const Sequelize = require('sequelize')
function loadConfig(app){
    load('config', (filename,conf)=>{
        if(conf.db){
            app.$db = new Sequelize(conf.db);
            // 加载模型
            app.$model = {};
            load('model', (filename, {schema, options})=>{
                app.$model[filename] = app.$db.define(filename, schema, options);
            })
            app.$db.sync();
        }
        // 加载中间件配置
        if (conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware', mid)
                app.$app.use(require(midPath))
            })
        }
    })
}

// 批处理任务
const schedule = require('node-schedule')
function initSchedule(){
    load('schedule', (filename, config)=>{
        schedule.scheduleJob(config.interval, config.handler);
    })
}
module.exports = {initRouter, initController, initService, loadConfig, initSchedule}