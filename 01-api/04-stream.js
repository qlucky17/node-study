/**
 * Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
 * 二进制友好，图片操作
 */

 const fs = require('fs');
 const rs = fs.createReadStream('./data/img.png');
 const ws = fs.createWriteStream('./data/img_copy.png');
 rs.pipe(ws);