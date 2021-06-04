//内置函数Date的原型，输出Object
//原型中的方法是给实例对象使用的，例如getDay() getFullYear()
console.log(Date.prototype)


//只用属性：constructor和__proto__
//默认指向一个Object空对象(没有我们自己的属性)
function Fun(){
    //console.log('funfun')
}
//每一个函数都有原型对象
console.log(Fun.prototype)
console.log(Fun.prototype.constructor.prototype)
console.log(Fun.prototype===Fun.prototype.constructor.prototype)//true

//此时fun的原型对象中增加了test方法
Fun.prototype.test = function(){
    console.log('test')
}

/*
//原型对象中有一个属性constructor，它指向函数对象
console.log(Date.prototype.constructor)
console.log(Date.prototype.constructor===Date)//true
console.log(Fun.prototype.constructor===Fun)//true
console.log(Fun.prototype.constructor===Fun())//false
console.log(Fun())//undefine
console.log(Fun)//输出函数体
*/


//给原型对象添加属性（一般是方法）===>实例对象可以访问
var fun = new Fun();
fun.test();


/*//任何对象都有属性__proto__
const obj1 = {
    'name':'jenny',
    'num':'12345'
}
console.log(obj1)*/


/*
//__proto__对象原型和构造函数的原型对象prototype是等价的
function Student(name,age){
    this.name=name;
    this.age=age;
}
var stu=new Student("jenny",20)
console.log(stu)
console.log("test1",stu.__proto__)
console.log(Student.prototype)
console.log("test2",stu.__proto__===Student.prototype)//true
*/
/*

//扩展内置对象——求和
console.log(Array.prototype)
Array.prototype.sum=function(){
    var sum=0;
    for(var i=0;i<this.length;i++){
        sum+=this[i];
    }
    return sum;
}
var arr=[1,2,3];
console.log(arr.sum());
*/

/*

//测试题1

function A(){}
A.prototype.n=1;
console.log(A.prototype)//{n: 1, constructor: ƒ}
var b=new A();

A.prototype={
    //constructor:A,    //手动添加构造函数
    n:2,
    m:3
}
console.log(A.prototype)//{n: 2, m: 3},这种是覆盖，如果不手动添加构造函数的话，是没有构造函数的
var c=new A()
console.log(b.n,b.m,c.n,c.m)//1 undefined 2 3

*/

//测试题2
function F(){}
Object.prototype.a=function(){
    console.log('a()');
}
Function.prototype.b=function(){
    console.log('b()');
}
var f=new F();
console.log(f)//F {}
console.log(Object.prototype)//{a: ƒ, constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, …}
console.log(F.prototype)
console.log('tttt',F.__proto__.b)//说明F.__proto__中有b,也有a
/*f.a();//a()
f.b();//报错,由于F.prototype能找到对象原型__proto__中的方法a,但没有方法b
F.a();//a()
F.b();//b()*/

