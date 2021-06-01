//对象赋值
//obj1对象包括基本类型以及引用类型
const obj1 = {
    'name':'estellanini',
    'age':18,
    'tel':'15000000000',
    'arraylist':[1,[3,4],[5,6]],
    'objectlist':{
        'id':20,
        'address':'beijing'
    }
};

/*
//直接赋值，obj2与obj1完全相同
let obj2 = obj1;
console.log('obj1',obj1);
console.log('obj2',obj2);
*/


/*
//此时直接更改obj2中的属性值，观察obj1中的值是否变化
//结果:更改obj2中的属性值，obj1中的值也跟随发生变化
//原理：当我们把一个对象赋值给一个新的变量时，赋的其实是该对象的在栈中的地址，而不是堆中的数据。
//     两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容
let obj2 = obj1;
obj2.name = "jenny";
obj2.arraylist[2]=[8,9,10];
obj2.objectlist.address="tianjin";
console.log('obj1',obj1);
console.log('obj2',obj2);
*/

/*
//使用Object.assign进行浅拷贝，直接更改obj3中的属性值，观察obj1中的变化
//结果：更改obj3中的属性值，在obj1中，基本类型值没有变化，但引用类型值发生了变化
//原理：如果是对象类型，则只拷贝一层，如果对象的属性又是一个对象，那么此时拷贝的就是此属性的引用
let obj3 = Object.assign({}, obj1);
obj3.name = "jenny";//修改后，obj1的此属性值不变
obj3.arraylist[2]=[8,9,10];//修改后，obj1的此属性值改变
obj3.objectlist.address="tianjin";//修改后，obj1的此属性值改变
console.log('obj1',obj1);
console.log('obj3',obj3);

*/


/*
//使用手写法hasOwnProperty实现浅拷贝
function shallowCopy(obj){
    const newObj={};
    for(let prop in obj){
        //console.log(prop)//此处输出的是name age tel arraylist objectlist
        if(obj.hasOwnProperty(prop)){
            newObj[prop]=obj[prop];
        }
    }
    return newObj;
}
const obj3 = shallowCopy(obj1);
obj3.name = "jenny";//修改后，obj1的此属性值不变
obj3.arraylist[2]=[8,9,10];//修改后，obj1的此属性值改变
obj3.objectlist.address="tianjin";//修改后，obj1的此属性值改变
console.log(obj1)
console.log(obj3)
*/

const arr1 = [1,2,{
    'name':'estellanini',
    'age':18,
}]

//数组浅拷贝 Array.prototype.concat(),直接更改arr2数组中的某个值，观察arr1中的该值是否变化
//结果：更改arr2中的属性值，在arr1中，基本类型值没有变化，但引用类型值发生了变化
/*let arr2 = arr1.concat();
arr2[0]=99;//修改后，arr1的此属性值不变
arr2[2].name='lala';//修改后，arr1的此属性值改变
console.log(arr1);
console.log(arr2);*/


/*//数组浅拷贝 Array.prototype.slice(),直接更改arr2数组中的某个值，观察arr1中的该值是否变化
//结果：更改arr3中的属性值，在arr1中，基本类型值没有变化，但引用类型值发生了变化
let arr3 = arr1.slice();
arr3[0]=99;//修改后，arr1的此属性值不变
arr3[2].name='lala';//修改后，arr1的此属性值改变
console.log(arr1);
console.log(arr3);*/

//使用扩展运算符进行浅拷贝
let arr4=[...arr1];
arr4[0]=99;//修改后，arr1的此属性值不变
arr4[2].name='lala';//修改后，arr1的此属性值改变
console.log(arr1);
console.log(arr4);











