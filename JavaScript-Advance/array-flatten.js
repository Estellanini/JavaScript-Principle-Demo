//方法一：reduce

/*function flatten(arr) {
    return arr.reduce((result, item)=> {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}*/

//方法二：toString & split
/*function flatten(arr) {
    console.log(arr.toString())//1,2,3,4,5
    return arr.toString().split(',').map(function(item) {
        return Number(item);
    })
}*/

//方法三：join&split
/*function flatten(arr) {
    console.log(arr.join());//1,2,3,4,5
    return arr.join(',').split(',').map(function(item) {
        return parseInt(item);
    })
}*/
//方法四：递归
/*function flatten(arr) {
    let res = [];
    arr.map(item => {
        if(Array.isArray(item)) {
            res = res.concat(flatten(item));
        } else {
            res.push(item);
        }
    });
    return res;
}*/

//方法五：扩展运算符
function flatten(arr) {
    while(arr.some(item=>Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten([1, [2, 3, [4, 5]]]));//[1,2,3,4,5]
