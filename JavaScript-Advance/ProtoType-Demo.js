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
