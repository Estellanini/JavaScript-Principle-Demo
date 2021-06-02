//obj1对象包括基本类型以及引用类型
const obj1 = {
    'name':'estellanini',
    'age':18,
    'tel':'15000000000',
    'arraylist':[1,[3,4],[5,6]],
    'objectlist':{
        'id':20,
        'address':'beijing'
    },
    'date': new Date(),
    'reg': new RegExp('\\w+'),
    'err': new Error('error message'),
    'map': new Map([
        ['name', '张三'],
        ['title', 'Author']
    ]),
};



//深拷贝初版,手写递归函数
//存在问题:1.判断是否对象的逻辑不够严谨
//2.没有对参数做检验
//3.没有考虑数组的兼容
function DeepCopy1(obj){
    const newObj={};
    for(let prop in obj){
        if(obj.hasOwnProperty(prop)){
            if(typeof obj[prop]==='object'){
                newObj[prop]=DeepCopy1(obj[prop]);
            }else{
                newObj[prop]=obj[prop];
            }
        }
    }
    return newObj;
}

//初版存在问题1的解决方法：Object.prototype.toString.call(x)
//在JavaScript里使用typeof判断数据类型，只能区分基本类型，即：number、string、undefined、boolean、object
//对于null、array、function、object来说，使用typeof都会统一返回object字符串
//要想区分对象、数组、函数、单纯使用typeof是不行的。在JS中，可以通过Object.prototype.toString方法，判断某个对象之属于哪种内置类型。
// 分为null、string、boolean、number、undefined、array、function、object、date、math。
function isObject(x){
    return Object.prototype.toString.call(x)==='[object,Object]';//强烈注意，后面的Object是大写
}
//初版存在问题2的解决方法
//if (!isObject(obj)) return obj;

//递归方法最大的问题在于爆栈，当数据的层次很深是就会栈溢出
//下面代码可以生成指定深度和每层广度的代码
function createData(deep, breadth) {
    var data = {};
    var temp = data;

    for (var i = 0; i < deep; i++) {
        temp = temp['data'] = {};
        for (var j = 0; j < breadth; j++) {
            temp[j] = j;
        }
    }

    return data;
}

/*const test=createData(3, 0); // 1层深度，每层有3个数据 {data: {0: 0, 1: 1, 2: 2}}
createData(3, 0); // 3层深度，每层有0个数据 {data: {data: {data: {}}}}
console.log(test)*/




//深拷贝改版1：手写递归函数
//存在问题：1.循环引用问题 2.递归爆栈问题
function DeepCopy2(obj){
    const newObj={};
    for(let prop in obj){
        if(obj.hasOwnProperty(prop)){
            if(isObject(obj[prop])){
                newObj[prop]=DeepCopy2(obj[prop]);
            }else{
                newObj[prop]=obj[prop];
            }
        }
    }
    return newObj;
}

//深拷贝方法之JSON.parse(JSON.stringify(obj))
//结果：RegExp、Error序列化的结果将只得到空对象
//时间对象，则序列化结果：时间对象=>字符串的形式，而不是时间对象
//JSON.parse(JSON.stringify(obj))会存在多种问题
//只适用于一般数据的拷贝（对象、数组）
function DeepCopyJSON(obj){
    return JSON.parse(JSON.stringify(obj))
}

/*//验证循环检测
var a={};
a.a=a;
console.log(DeepCopy(a))//Uncaught TypeError: Converting circular structure to JSON*/



//用循环实现深拷贝
//存在问题：RegExp、Error序列化的结果将只得到空对象
//时间对象，则序列化结果：时间对象=>字符串的形式，而不是时间对象
//同时，也没有解决循环引用的问题
function DeepCopyLoop(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}

/*//验证循环检测
var a={};
a.a=a;
console.log(DeepCopy(a))//Uncaught TypeError: Converting circular structure to JSON*/

// 保持引用关系
//date、error、reg拷贝完全部为空
function DeepCopyForce(x) {
    // =============
    const uniqueList = []; // 用来去重
    // =============

    let root = {};

    // 循环数组
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        // =============
        // 数据已经存在
        let uniqueData = find(uniqueList, data);
        if (uniqueData) {
            parent[key] = uniqueData.target;
            break; // 中断本次循环
        }

        // 数据不存在
        // 保存源数据，在拷贝数据中对应的引用
        uniqueList.push({
            source: data,
            target: res,
        });
        // =============

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}

function find(arr, item) {
    for(let i = 0; i < arr.length; i++) {
        if (arr[i].source === item) {
            return arr[i];
        }
    }

    return null;
}

//验证循环检测：不报错
/*var a={};
a.a=a;
console.log(DeepCopyForce(a))//Uncaught TypeError: Converting circular structure to JSON*/




//深拷贝版本3
/*解决以下问题：
属性是基本类型
属性是对象
属性是数组
循环引用的情况，比如 obj.prop1 = obj*/

/*
仍存在的问题：
一些特殊类型的对象，比如 Date, 正则，Set，Map等没有处理
使用typeof 来判断是否是对象是有问题的，typeof null 的结果也是 'object'
*/

function DeepCopy3(originObj, map = new WeakMap()) {
    // 判断是否为基本数据类型
    if(typeof originObj === 'object') {
        // 判断是都否为数组
        const cloneObj = Array.isArray(originObj) ? [] : {};
        // 判断是否为循环引用
        if(map.get(originObj)) {
            return map.get(originObj);
        }
        map.set(originObj, cloneObj);
        for(const prop in originObj) {
            cloneObj[prop] = DeepCopy3(originObj[prop], map);
        }
        return cloneObj;
    } else {
        return originObj;
    }
}


/*obj1.obj2 = obj1;
const aa = DeepCopy3(obj1);
console.log(aa);*/



//深拷贝版本4
//解决版本3的问题：

function DeepCopy4(originObj, map = new WeakMap()) {
    // 判断是否为基本数据类型
    if(isObject_v2(originObj)) {
        // 判断是否为循环引用
        if(map.get(originObj)) {
            return map.get(originObj);
        }

        // 判断是否为几种特殊需要处理的类型
        let type = [Date, RegExp, Set, Map, WeakMap, WeakSet];
        if(type.includes(originObj.constructor)) {
            return new originObj.constructor(originObj);
        }
        // 其他类型
        let allDesc = Object.getOwnPropertyDescriptors(originObj);
        let cloneObj = Object.create(Object.getPrototypeOf(originObj), allDesc);

        // Reflect.ownKeys 可以获取到
        for(const prop of Reflect.ownKeys(originObj)) {
            cloneObj[prop] = isObject_v2(originObj[prop]) && typeof originObj[prop] !== 'function' ? DeepCopy4(originObj[prop], map) : originObj[prop];
        }
        return cloneObj;
    } else {
        return originObj;
    }
}
/*

// 是否为引用类型
function isObject_v2(obj) {
    return typeof obj === 'object' || typeof obj === 'function' && obj !== null;
}

let cloneObj = DeepCopy4(obj1);
console.log(obj1);
console.log(cloneObj);
*/




/*const obj2=DeepCopy1(obj1);
const obj2=DeepCopy2(obj1);
const obj2=DeepCopyJSON(obj1)
const obj2=DeepCopyLoop(obj1);*/
const obj2 = _.cloneDeep(obj1);


/*const obj2=DeepCopyForce(obj1);*/
obj2.name = "jenny";//修改后，obj1的此属性值不变
obj2.arraylist[2]=[8,9,10];//修改后，obj1的此属性值不变
obj2.objectlist.address="tianjin";//修改后，obj1的此属性值不变
console.log(obj1);
console.log(obj2);







