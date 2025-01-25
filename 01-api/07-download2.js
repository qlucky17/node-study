/**
 * promisify让异步任务串行化, 可以node异步函数的callback变成promise形式, 例：
 * const {promisify} = require('util')
 * const readFile = promisify(fs.readFile)
 * readFile('xxx').then(data=>{xxx}).catch(err=>{xxx})
 */

module.exports.clone = async function clone(url, dest) {
    const ora = require('ora')
    const process = ora('下载项目...');
    process.start();
    const {promisify} = require('util')
    const download = promisify(require('download-git-repo'));
    try{
        await download(url, dest);
    } catch(error){
        process.fail();
    }
    process.succeed();
}

// clone('github:su37josephxia/vue-template', './download')

