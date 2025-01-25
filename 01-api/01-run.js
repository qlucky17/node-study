// 全局对象
// console.log(global);
// console.log(process);
// console.log(__dirname);     //D:\xampp\htdocs\Projects\kkb-node\api
// console.log(__filename);    //D:\xampp\htdocs\Projects\kkb-node\api\01-run.js

var main = {
  a: 10,
  b: 20,
  sum: function () {
    var res = 0;
    for (let i in arguments) {
      res += arguments[i];
    }
    return res;
  },
};
module.exports = main;