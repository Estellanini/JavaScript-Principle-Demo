function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        console.log(typeof item + item);
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}

console.log(unique([1,1,2,3,5,5,6,7,8,8]))


function distinct(arr) {
    for (let i=0;i<arr.length; i++) {
        for (let j=i+1; j<arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);//两个参数代表删除：删除元素的位置，删除元素的数量
                // splice 会改变数组长度，所以要将(数组长度 len )和下标 j 减一
                j--;
            }
        }
    }
    return arr;
}

function unique(arr) {
    return Array.from(new Set(arr));
}

function unique(arr) {
    return [...new Set(arr)];
}

let unique = (arr) => [...new Set(arr)]

function unique(arr) {
    var res = [];
    arr = arr.sort();
    var res= [arr[0]];//第一个元素放在结果中
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            res.push(arr[i]);
        }
    }
    return res;
}


function distinct(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}


function unique(arr) {
    let obj = {};
    let res = [];
    for(let i = 0;i < arr.length;i++){
        if(!obj[arr[i]]){
            obj[arr[i]] = {};   //json[this[i]]可以随意赋值
            res.push(arr[i]);
        }
    }
    return res;
}
console.log(unique([1,1,2,2,3]))   //[1,2,3]


function unique(arr) {
    var res =[];
    for(var i = 0; i < arr.length; i++) {
        if( !res.includes( arr[i]) ) {//includes 检测数组是否有某个值
            res.push(arr[i]);
        }
    }
    return res;
}


function unique(arr){
    return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
}
