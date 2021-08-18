//方法一：事件监听法
//首先要获取图片，这里我们获取所有的img标签
const images=document.querySelectorAll('img');
//事件监听滚动事件，每次滚动的时候，我们需要判断每张图片的位置是否出现在可视区域
window.addEventListener('scroll',(e)=>{
    //可以用forEach来遍历，每次遍历的时候我们都获取每张图片到顶部的距离,并且进行if判断
    images.forEach(image=>{
        const imageTop=image.getBoundingClientRect().top;
        //if判断，如果图片距离视窗顶部的距离小于窗口显示区的高度
        if(imageTop<window.innerHeight){
            //那么就需要对图片进行处理：使图片可以开始加载，这里需要修改html
            //如果用户还没滚动到指定位置，我们需要不加载图片，一种简单的做法：使用自定义属性data-。
            //获取一下刚刚取得的自定义属性，然后把这个自定义属性赋值给原来的src属性
            const data_src = image.getAttribute('data-src');
            image.setAttribute('src',data_src);
        }
        console.log("scroll");//在控制台输出看一下scroll触发的次数
    })
})




//方法二：IntersectionObserver
//1. 获取所有img元素
const images=document.querySelectorAll('img')

//4. 单独提出来的回调函数功能:每次进入或者离开图片区域都会触发这个回调函数
//但是我们此时并不知道触发回调函数时图片处于什么位置（也就是 是否已经观察到了图片我们不知道）
//所以这个回调函数是有参数的，entries，接收一个数组
const callback=(entries)=>{
    console.log("看见了触发，看不见触发");
    console.log(entries);//由于有三张图片，所以输出的数组长度为3
    //既然entries是数组，所以我们依旧需要去遍历
    entries.forEach(entry=>{
        console.log(entry);//输出每一次触发的细节；细节里有isIntersecting属性（是否交叉）代表着是否进行到可视区域，还没滚动之前是false,滚动到图片区域后，就是true。有了这个属性我们就可以判断该次触发回调函数时是否已经观察到了图片。细节里还有target属性，告诉我们目标元素是什么，这里是img
        if(entry.isIntersecting){//如果isIntersecting为true,也就是看见了图片
            const image=entry.target;//那么就获取相应的图片节点
            const data_src=image.getAttribute('data-src');//并且获取自定义属性
            image.setAttribute('src',data_src);//修改为常规的src属性
            observer.unobserve(image);//在图片被加载之后取消回调函数的触发，直接取消观察这个动作，否则在图片加载之后还是会不停触发
            console.log('触发');
        }
    })
}
//2. 创建IntersectionObserver实例，并且传入参数callback
const observer=new IntersectionObserver(callback);
//3. 前面已经获取了多个img元素，因此我们需要forEach进行遍历，使得每个img元素都开始被观察
images.forEach(image=>{
    //在每次循环的时候使用observer实例的observe方法来观察每一个img元素
    observer.observe(image);
})
