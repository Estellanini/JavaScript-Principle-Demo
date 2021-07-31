/*
function getNumber(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            if(num<=5){
                resolve(num);
            }
            else{
                reject("数字太大了",num);
            }
        }, 2000);
    });
    return p;
}

getNumber()
    .then(
        function(data){
            console.log('resolved');
            console.log(data);
            console.log(somedata); //此处的somedata未定义
        },
        function(reason){
            console.log('rejected');
            console.log(reason)
        }
    )
    .catch(function(reason){//效果和写在then的第二个参数里面一样
        //不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，
        // 如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。
        console.log('rejected');
        console.log(reason);
    });
*/


let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功了')
    }, 2000);
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('失败了')
    }, 1000);
})


Promise.race([p1, p2]).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})
//输出：失败了
