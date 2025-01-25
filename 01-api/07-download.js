// 引用node内建模块
// const os = require('os')
// const mem = os.freemem()/os.totalmem()*100;
// console.log(`内存占用率: ${mem.toFixed(2)}%`)



/**
 * 使用第三方模块, 
 * 下载：npm i download-git-repo -S
 * 进度提示：npm i ora -S
 */
const ora = require('ora')
const process = ora('下载项目...');
process.start();
const download = require('download-git-repo')
download('github:su37josephxia/vue-template', 'download', err=>{
    // console.log(err ? '下载失败' : '下载成功');
    if(err){
        process.fail();
    } else{
        process.succeed();
    }
})