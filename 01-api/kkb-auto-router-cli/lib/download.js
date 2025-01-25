
const ora = require('ora');
const {promisify} = require('util')
const download = promisify(require('download-git-repo'))

module.exports.clone = async function clone(url, dest) {
    const process = ora('下载项目...');
    process.start();
    try{
        await download(url, dest);
    } catch(error){
        process.fail();
    }
    process.succeed();
}
