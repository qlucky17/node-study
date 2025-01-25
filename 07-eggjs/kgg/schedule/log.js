// 批处理任务
module.exports = {
    interval:'*/3 * * * * *',  //cron表达式，http://cron.qqe2.com/
    handler(){
        console.log('定时任务 嘿嘿 三秒执行一次'+ new Date())
    }
}