//this指向原理
/*

console.log("全局",this)//window

function foo(a,b){
    'use strict'
    console.log("函数执行上下文 ",this)//window,在严格模式下指向undefined
    return a+b;
}
foo(1,2);
*/


var a = 10
const b = 20

function foo () {
    console.log(this.a)
    console.log(this.b)
}
foo();
console.log(window.a)

