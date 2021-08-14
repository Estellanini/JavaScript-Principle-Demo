//测试auguments的用法

/*function test(a,b,c){
    console.log(arguments);
    console.log(arguments.length);
    let args = [].slice.call(arguments,1);
    console.log(args);
    return a+b+c;
}
test(1,2,3);*/

//函数柯里化
function curry (fn, currArgs) {
    return function() {
        let args = [].slice.call(arguments);

        // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
        if (currArgs !== undefined) {
            args = args.concat(currArgs);
        }

        // 递归调用
        if (args.length < fn.length) {
            return curry(fn, args);
        }

        // 递归出口
        return fn.apply(null, args);
    }
}
function sum(a, b, c) {
    console.log(a + b + c);
}

const fn = curry(sum,4);
fn(2,3);
fn(2)(3);
fn(1)(2);

/*
const fn = curry(sum);
fn(1, 2, 3); // 6
fn(1, 2)(3); // 6
fn(1)(2, 3); // 6
fn(1)(2)(3); // 6*/
