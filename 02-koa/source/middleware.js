// 一、中间件，组合函数
const add = (x,y) => x+y;
const square = x => x*x;
// const fn = (x,y) => square(add(x,y));
// console.log('计算结果：'+ fn(1,2))


// const compose = (fn1, fn2) => (...args)=>fn2(fn1(...args));
// const fn = compose(add, square);
// console.log('计算结果：'+ fn(1,2))


// const compose = (...[first, ...other]) => (...args)=>{
//     let res = first(...args);
//     other.forEach(fn=>{
//         res = fn(res);
//     });
//     return res;
// };
// const fn = compose(add, square);
// console.log('计算结果：'+ fn(1,2))



// 二、中间件异步
function compose(middlewares){
    return function(){
        return dispatch(0);
        function dispatch(i){
            let fn = middlewares[i];
            if(!fn){
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next(){
                    return dispatch(i+1);
                })
            )
        }
    }
}

async function fn1(next){
    console.log('fn1 start');
    await next();
    console.log('fn1 end');
}
async function fn2(next){
    console.log('fn2 start');
    await delay();
    await next();
    console.log('fn2 end');
}
async function fn3(next){
    console.log('fn3 start');
    console.log('fn3 end');
}
function delay(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('delay...');
            resolve('delayed kkk');
        }, 2000);
    })
}
const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();