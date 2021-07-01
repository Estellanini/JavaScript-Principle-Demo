function runAsync1(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;
}
function runAsync2(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;
}
function runAsync3(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;
}


/*Promise
    .all([runAsync1(), runAsync2(), runAsync3()])
    .then(function(results){
        console.log(results);
    });*/
//结果：
// 异步任务1执行完成
// 异步任务2执行完成
// 异步任务3执行完成
// ["随便什么数据1", "随便什么数据2", "随便什么数据3"]


//此时将上面runAsync1的延时改为1秒,runAsync2和runAsync3都为2秒
//1秒后runAsync1已经执行完了，此时then里面的就执行了
//在then里面的回调开始执行时，runAsync2()和runAsync3()并没有停止，仍旧再执行。于是再过1秒后，输出了他们结束的标志。
/*Promise
    .race([runAsync1(), runAsync2(), runAsync3()])
    .then(function(results){
        console.log(results);
    });*/
//结果：
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//异步任务3执行完成


//请求某个图片资源
function requestImg(){
    var p = new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function(){
            resolve(img);
        }
        img.src = "../Test-pics/5.jpg";
    });
    return p;
}

//延时函数，用于给请求计时
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 8000);
    });
    return p;
}

Promise
    .race([requestImg(), timeout()])
    .then(function(results){
        console.log(results);
    })
    .catch(function(reason){
        console.log(reason);
    });
