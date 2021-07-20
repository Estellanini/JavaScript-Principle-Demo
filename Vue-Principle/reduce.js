//reduce用法一：实现数值的累加操作

const arr=[2,4,6,2,7,5,4]

//累加操作的普通逻辑
let sum=0;
arr.forEach((item)=>{
    sum+=item;
});
console.log(sum) //30

//使用数组.reduce(函数，初始值)，初始值只会在循环一开始的时候生效
//arr.reduce(()=>{},0)
//arr.reduce((上次计算的结果，当前循环的item项)=>{},0)
//arr.reduce((上次计算的结果，当前循环的item项)=>{对于上次结果和当前项的使用。如果是求和操作，则是上次的结果加上当前循环的item项},0)
//const累加的结果=arr.reduce((上次计算的结果，当前循环的item项)=>{对于上次结果和当前项的使用。如果是求和操作，则是上次的结果加上当前循环的item项},0)
const sum=arr.reduce((val,item)=>{return val+item},0)
console.log(sum)//30


//reduce用法二：链式获取对象属性的值
const obj={
    name:'nini',
    info:{
        address:{
            location:'Harbin'
        }
    }
}
const city=obj.info.address.location;
console.log(city);//Harbin
//定义数组
//通过reduce拿到嵌套在最里面的属性值
//const attrs=['info','address','location'];
//attrs.reduce(()=>{},obj)
//第一次reduce，初始值是obj这个对象，当前的Item项是info,第一次reduce的结果是obj.info属性对应的对象
//第二次reduce，初始值是obj.info这个对象，当前的Item项是address,第二次reduce的结果是obj.info.address属性对应的对象
//第三次reduce，初始值是obj.info.address这个对象，当前的Item项是location,第三次reduce的结果是obj.info.address.location属性对应的值
//因为k是个变量，用变量来取一个属性对应的值，只能用中括号
const city=attrs.reduce((newObj,k)=>{return newObj[k]},obj);
console.log(city)//Harbin


//定义字符串
const attrStr='info.address.location';
const city=attrStr.split(".").reduce((newObj,k)=>{return newObj[k]},obj);
console.log(city)
