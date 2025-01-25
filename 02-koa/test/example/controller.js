const fs = require('fs')

function addControllers(router){
    let files = fs.readdirSync(__dirname+'/controllers');
    files = files.filter((item,index)=>{
        return item.endsWith('.js');
    })
    // console.log(files)
    files.forEach((filename,index)=>{
        let model = require(__dirname+'/controllers/'+filename);
        for(let fullpath in model){
            let [method, url] = fullpath.split(' ');
            method = method.toLowerCase();
            // if(method=='get'){
            //     router.get(url, model[fullpath]);
            // }
            // if(method=='post'){
            //     router.post(url, model[fullpath]);
            // }
            router[method](url, model[fullpath]);
        }
    })
    
}
module.exports = addControllers;