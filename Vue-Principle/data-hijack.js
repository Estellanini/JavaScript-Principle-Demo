//简单实现一个只有数据劫持的Vue
//既然new Vue了，所以Vue一定是个类
class Vue{
    //定义构造函数，接收一个options,options就指向这个对象（里面是el、data等等）
    constructor(options) {
        //接下来我们希望将它挂载到vm实例身上，因为最后new完之后，会把它给vm
        //将options.data挂载给当前vm实例的自定义属性$data
        //此时需要注意，当前这个对象上的每一个属性，没有getter和setter,我们在用Vue的时候，在data中的每一个属性，下面都有getter和setter,
        // 这些getter、setter都是通过Object.defineproperty()定义上去的
        this.$data=options.data;//此时在控制台输出vm，会发现Vue的实例vm中有$data属性，值为 {name: "nini", age: 23, info: {…}}

        //调用数据劫持的方法Observe,把你要劫持的数据传进去，传this.$data和options.data是一样的
        Observe(this.$data);

    }
}

//定义一个数据劫持的方法,用一个obj来接收参数(接收vm实例上的data)
function Observe(obj){
    //需要对obj对象上的每一个属性都进行拦截
    //那么如何获取到data对象上的每一个属性？
    //通过keys就可以拿到当前对象上每一个属性的键，形成一个数组
    //console.log(Object.keys(obj));//["name", "age", "info"]
    //所以下面就应该循环data里的每一个属性，分别把每个属性改成setter和getter,因为我们要拦截取值和赋值的操作
    //如果是个纯对象是没有办法进行拦截的，必须每个属性都有setter和getter

    //这里增加一个递归的终止条件，判断obj有没有值，或者判断obj是不是对象，若无值或不是对象，则不用递归了
    if(!obj||typeof obj!=='object') return;
    //通过Object.keys(obj)获取当前obj上的每一个属性,注意这里仅仅是第一层循环
    Object.keys(obj).forEach(key=>{
        //单独存一下：当前被循环的key所对应的属性值
        let value=obj[key];
        //把value这个子节点进行递归,让除了第一层的属性之外，更深层次的属性也拥有get set方法，例如让info中的a、c属性也拥有get set方法
        Observe(value);
        //需要为当前的key所对应的属性（name,age,info）,添加setter和getter
        //第一次循环key是name,第二次循环key是age,第三次循环key是info
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            //只要拦截到有调用了getter，就应该把name属性的值给返回去
            //当要取值的时候，把上面单独存出来的value给return回去
            get() {
                console.log(`有人获取了${key}的值`);
                return value;
            },
            //赋值操作
            set(newVal) {
                value=newVal;
                //再次调用递归：为什么？如果此处不调用递归，新赋值的对象会覆盖之前已经有get 和set的对象
                //举例：若赋值操作：vm.$data.info={d:4,e:5}，d和e是没有getter和setter的
                //如何让新赋值的对象也具有getter、setter,所以要再次递归
                Observe(value);//这里传入value或者newVal是等价的
            }
        })
    })

}
