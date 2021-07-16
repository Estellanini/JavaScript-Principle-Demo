//发布订阅模式
//收集依赖 收集订阅
class Dep{
    constructor() {
        //subs数组，用来存放所有订阅者的信息
        this.subs=[];
    }
    //向subs数组中添加订阅者信息,存的每一项都是订阅者的实例
    addSub(watcher){
        this.subs.push(watcher);

    }
    //发布订阅的方法，会循环数组调用每一个订阅者身上的订阅信息
    //循环调用 update方法
    notify(){
        this.subs.forEach((watch)=>watch.update());
    }
}


//订阅者的类
class Watcher{
    //希望接收一个回调，把当前回调挂载到当前watcher的身上
    constructor(cb) {
        //这里的cb是干嘛的？就是根据最新的数据来更新我们的DOM结构
        this.cb=cb;
    }
    //触发回调的方法
    update(){
        this.cb();
    }

}

const w1=new Watcher(()=>{
    console.log('第一个订阅者')
})

w1.update();//第一个订阅者

const w2=new Watcher(()=>{
    console.log('第二个订阅者');
})

const dep=new Dep();
dep.addSub(w1);
dep.addSub(w2);

//只要我们为Vue中data数据重新赋值了，这个赋值的动作，会被Vue监听到然后vue要把数据的变化，通知到每个订阅者
//因为他希望订阅者知道自己变化了从而刷新自己的DOM结构
//数据被改变，页面会自动重新渲染，但在Vue内部，需要程序员手动来实现
//接下来，订阅者（DOM元素）要根据最新的数据，更新自己的内容
dep.notify();

//Vue要做的事情就是把数据的变化通知到每个订阅者，这里每个订阅者就是DOM元素，为什么DOM元素要订阅数据的变化？
//因为数据变了，DOM要更新自己，所以要订阅数据的变化（因为不知道数据什么时候变），数据不在DOM这里，而在Vue那里

//要调用dep.notify()去通知订阅者,如何通知的？在notify()中有循环，在数组中循环调用update(),调用一次update()即通知了一个订阅者


