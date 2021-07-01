//词法分析1：
//结果：输出2
/*function foo() {
    console.log( a );
}

function bar() {
    var a = 3;
    foo();
}

var a = 2;
bar();*/

/*//词法分析2：
//结果：输出10
var foo = 1;
function bar() {
    if (!foo) {
        var foo = 10;
    }
    console.log(foo);
}
bar();*/

/*

//结果undefined
console.log(foo)
var foo='foo';

//结果报错
console.log(foo)
let foo='foo';
*/


//报错：a不能使用
var a= 10;
function foo() {
    console.log(a);
    let a;
}
foo();
