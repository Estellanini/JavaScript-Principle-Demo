Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
    };
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
    }
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            //将数字转为字符串，这样才能求length
            fmt = fmt.replace(RegExp.$1,  (("00" + o[k]).substr(("" + o[k]).length)));//为了让0占位，否则就是17：32：9
        }
    return fmt;
}
console.log(new Date(1542274329900).Format('yyyy-MM-dd hh:mm:ss'));//2018-11-15 17:32:09
console.log(new Date(1542274329900));//Thu Nov 15 2018 17:32:09 GMT+0800 (中国标准时间)
