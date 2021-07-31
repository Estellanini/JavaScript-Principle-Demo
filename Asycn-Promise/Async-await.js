/*
function getSomething() {
    return "something";
}

async function testAsync() {
    return Promise.resolve("hello async");
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}

test();//something hello async

*/

async function foo(){
    console.log(1);
    let a=await 100;
    console.log(a);
    console.log(2);
}

console.log(0);
foo();
console.log(3);
//0
// 1
// 3
// 100
// 2

