/**
* JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
* 但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
*/

// 创建一个长度为10字节以0填充的Buffer
const buf1 = Buffer.alloc(10)
console.log(buf1)
console.log('---------------------')

// 创建一个Buffer包含ascii.
const buf2 = Buffer.from('a')
console.log(buf2, buf2.toString())
console.log('---------------------')
const buf22 = Buffer.from('a', 'ascii')
console.log(buf22, buf22.toString('utf8'))
console.log('---------------------')

// 创建Buffer包含UTF-8字节
const buf3 = Buffer.from('中文')
console.log(buf3)
console.log('---------------------')

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer
const buf4 = Buffer.from([1,2,3])
console.log(buf4)
console.log('---------------------')

// 合并Buffer
const buf5 = Buffer.concat([buf2,buf3])
console.log(buf5, buf5.toString())


// let b1 = Buffer.from('a', 'ascii');
// let b11 = b1.toString('ascii')
// console.log(b1);
// console.log(b11);