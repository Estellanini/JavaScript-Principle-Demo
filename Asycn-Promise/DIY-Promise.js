const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
        if (this.state === PENDING) {
            this.state = FULFILLED;
            this.value = value;
            this.onFulfilledCallbacks.forEach(fun => {
                fun();
            });
        }
    }

    const reject = (reason) => {
        if (this.state === PENDING) {
            this.state = REJECTED;
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fun => {
                fun();
            });
        }
    }

    try {
        executor(resolve, reject);
    } catch (reason) {
        reject(reason);
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    switch (this.state) {
        case FULFILLED:
            onFulfilled(this.value);
            break;
        case REJECTED:
            onFulfilled(this.value);
            break;
        case PENDING:
            this.onFulfilledCallbacks.push(() => {
                onFulfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
            break;
    }
}


MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
};



MyPromise.prototype.finally = function(fn) {
    return this.then(value => {
        fn();
        return value;
    }, reason => {
        fn();
        throw reason;
    });
};

MyPromise.resolve = function(value) {
    return new MyPromise((resolve, reject) => {
        resolve(value);
    });
};

MyPromise.reject = function(reason) {
    return new MyPromise((resolve, reject) => {
        reject(reason);
    });
};


MyPromise.all = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve([]);
        } else {
            let result = [];
            let index = 0;
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(data => {
                    result[i] = data;
                    if (++index === promises.length) {
                        resolve(result);
                    }
                }, err => {
                    reject(err);
                    return;
                });
            }
        }
    });
}

MyPromise.race = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve();
        } else {
            let index = 0;
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                    return;
                });
            }
        }
    });
}



let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功了')
    }, 2000);
})

let p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('失败了')
    }, 1000);
})

let p3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功了1000')
    }, 1000);
})

/*MyPromise.race([p1, p2]).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})*/



/*MyPromise.all([p1, p3]).then((result) => {
    console.log(result)//[ '成功了', '成功了1000' ]
}).catch((error) => {
    console.log(error)
})*/
/*
MyPromise.resolve(123).then((result) => {
    console.log(result)
})
MyPromise.resolve(p1).then((result) => {
    console.log(result)
})*/
/*MyPromise.reject(123).then(()=>{},(result) => {
    console.log(result)
})*/
