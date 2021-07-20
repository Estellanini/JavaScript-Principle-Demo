const obj={
    name:'nini',
    age:23
}
/*//取值操作
console.log(obj.name);//nini
//赋值操作
obj.name='lala';
console.log(obj);//{ name: 'lala', age: 23 }*/

//如何能监听到赋值操作，是我们要关心的事情
//Object.defineProperty()为对象定义属性
//我们为obj对象定义了一个新属性name,这个新属性在赋值的时候会被set()拦截，在取值的时候会被get()拦截
Object.defineProperty(obj,'name',{
    enumerable:true,//当前属性是否可枚举，允许被循环
    configurable:true,//当前属性是否允许被配置 例如delete
    get() {//getter
        console.log("有人获取了obj.name的值");
        return "estellanini";
    },
    set(newVal){//setter
        console.log("我不要你的新值",newVal);
    }

})
console.log(obj.name)//有人获取了obj.name的值    estellanini
obj.name="lalala";//我不要你的新值 lalala


let key='sdfsdfs'
console.log(`测试用法${key}的值`)


