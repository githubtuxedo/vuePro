class Interceptor {
    constructor() {
        this.handler = [];
    }
    //添加一个拦截器
    use(obj) {
        this.handler.push({
            request: obj.request,
            requestErr: obj.requestErr,
            response: obj.response,
            responseErr: obj.responseErr,
        })
    }
    // 删除一个拦截器
    eject(index) {
        delete this.handler[index];
    }
    // 遍历获取拦截器
    query(fn) {
        this.handler.forEach((v) => {
            // v.request
            if (!!v) {
                fn(v);
            }
        })
    }
}
class HttpRequest {
    constructor() {
        this.__initInterceptor();
        this.__initMethod();
    }
    __initInterceptor() {
        this.interceptor = new Interceptor();
        this.interceptor.use({
            request(...args) {
                console.log('before request', ...args);
            },
            requestErr(requestErr) {
                console.log('requestErr', requestErr);
                return Promise.reject(requestErr);
            },
            response(response) {
                console.log('after request response', response);
            },
            responseErr(responsetErr) {
                console.log('responseErr', responsetErr);
                return Promise.reject(responsetErr);
                //.catch((res)=>{return res}); //每次reject后不进行捕获控制台会报错，如果该拦截请求挂掉 且后面请求都会挂掉。catch后如果后面不使用本次请求数据 则正常继续，否则会影响结果。
            }
        })
    }
    __initMethod() {
        const type = ['post', 'get', 'delete'];
        for (let i of type) {
            let methodName = i + "request";
            this[methodName.toLowerCase()] = () => {
                console.log(methodName);
            }
        }
        this.request = (...args) => {
            // console.log('init args:',...args);
            this.__initDefaultRequest(...args);
        }
    }
    __initDefaultRequest(params) {
        let reqeustInterceptors = [],
            responseInterceptors = [];
        let config = {

        }
        Object.assign(config, params);

        //取拦截器
        let interceptorQuery = this.interceptor.query((obj) => {
            if (!!obj.request && !!obj.requestErr) {
                reqeustInterceptors.push(obj.request, obj.requestErr);
            }
            if (!!obj.response && !!obj.responseErr) {
                responseInterceptors.push(obj.response, obj.responseErr);
            }
        })
        // console.log(reqeustInterceptors, responseInterceptors);
        const chainInterceptor = (p, interceptors) => {
            for (let i = 0, len = interceptors.length; i < len;) {
                let resolveFn = interceptors[i++],
                    rejectFn = interceptors[i++];
                p = p.then(resolveFn, rejectFn);
            }
            // console.log("p",p);
            return p;
        }

        //取子类传进来的参数
        const funcRequest = () => {
            // console.log('get here', config);
            return this.__http(config);
        }

        let promise = Promise.resolve(config);

        promise = chainInterceptor(promise, reqeustInterceptors);
        // promise = promise.then(funcRequest).catch((res)=>{console.log(res)});
        promise = promise.then(funcRequest);
        // promise = promise.then(()=>console.log('after http'));
        promise = chainInterceptor(promise, responseInterceptors);

        // promise.then(()=>console.log('final promise:',promise), () => console.log('final promise:', promise));
        return promise;
    }
    __http(setting) {
        let $this = this;
        return new Promise((resolve, reject) => {
            // let timer = setTimeout(() => {
            //     // console.log("send request: arguments",config);
            //     clearTimeout(timer);
            //     // throw new Error("test");
            //     // reject(new Error('test'));
            //     resolve();
            // }, 2000);
            http.ajax(Object.assign({}, setting,{
                success: (res)=>{
                    console.log('request success');
                    !!setting.success && setting.success();
                    resolve();
                },
                error: (res) => {
                    console.log('request fail');
                    !!setting.error && setting.error();
                    reject();
                }
            }));
        })
    }
}

class HttpService extends HttpRequest {
    constructor() {
        super();
        this.interceptor.use({
            request(request) {
                console.log('service request');
            },
            requestErr(requestErr) {
                console.log('serice request err');
                return Promise.reject(requestErr);
            },
            response(response) {
                console.log('service response');
            },
            responseErr(responseErr) {
                console.log('service response err');
                return Promise.reject(responseErr);
            }
        })
    }
}


const http = {
    /**
     * js封装ajax请求
     *  @param settings 请求参数模仿jQuery ajax
     *  调用该方法,data参数需要和请求头Content-Type对应
     *  Content-Type                        data                                     描述
     *  application/x-www-form-urlencoded   'name=哈哈&age=12'或{name:'哈哈',age:12}  查询字符串,用&分割
     *  application/json                     name=哈哈&age=12'                        json字符串
     *  multipart/form-data                  new FormData()                           FormData对象,当为FormData类型,不要手动设置Content-Type
     *  注意:请求参数如果包含日期类型.是否能请求成功需要后台接口配合
     */
    ajax: (settings = {}) => {
        // 初始化请求参数
        let _s = Object.assign({
            url: '', // string
            type: 'GET', // string 'GET' 'POST' 'DELETE'
            dataType: 'json', // string 期望的返回数据类型:'json' 'text' 'document' ...
            async: true, //  boolean true:异步请求 false:同步请求 required
            data: null, // any 请求参数,data需要和请求头Content-Type对应
            headers: {}, // object 请求头
            timeout: 1000, // string 超时时间:0表示不设置超时
            beforeSend: (xhr) => {
            },
            success: (result, status, xhr) => {
            },
            error: (xhr, status, error) => {
            },
            complete: (xhr, status) => {
            }
        }, settings);
        // 参数验证
        if (!_s.url || !_s.type || !_s.dataType || !_s.async) {
            throw new Error('参数有误');
        }
        // 创建XMLHttpRequest请求对象
        let xhr = new XMLHttpRequest();
        // 请求开始回调函数
        xhr.addEventListener('loadstart', e => {
            _s.beforeSend(xhr);
        });
        // 请求成功回调函数
        xhr.addEventListener('load', e => {
            const status = xhr.status;
            if ((status >= 200 && status < 300) || status === 304) {
                let result;
                if (xhr.responseType === 'text') {
                    result = xhr.responseText;
                } else if (xhr.responseType === 'document') {
                    result = xhr.responseXML;
                } else {
                    result = xhr.response;
                }
                // 注意:状态码200表示请求发送/接受成功,不表示业务处理成功
                _s.success(result, status, xhr);
            } else {
                _s.error(xhr, status, e);
            }
        });
        // 请求结束
        xhr.addEventListener('loadend', e => {
            _s.complete(xhr, xhr.status);
        });
        // 请求出错
        xhr.addEventListener('error', e => {
            _s.error(xhr, xhr.status, e);
        });
        // 请求超时
        xhr.addEventListener('timeout', e => {
            _s.error(xhr, 408, e);
        });
        let useUrlParam = false;
        let sType = _s.type.toUpperCase();
        // 如果是"简单"请求,则把data参数组装在url上
        if (sType === 'GET' || sType === 'DELETE') {
            useUrlParam = true;
            _s.url += http.getUrlParam(_s.url, _s.data);
        }
        // 初始化请求
        xhr.open(_s.type, _s.url, _s.async);
        // 设置期望的返回数据类型
        xhr.responseType = _s.dataType;
        // 设置请求头
        for (const key of Object.keys(_s.headers)) {
            xhr.setRequestHeader(key, _s.headers[key]);
        }
        // 设置超时时间
        if (_s.async && _s.timeout) {
            xhr.timeout = _s.timeout;
        }
        // 发送请求.如果是简单请求,请求参数应为null.否则,请求参数类型需要和请求头Content-Type对应
        xhr.send(useUrlParam ? null : http.getQueryData(_s.data));
    },
    // 把参数data转为url查询参数
    getUrlParam: (url, data) => {
        if (!data) {
            return '';
        }
        let paramsStr = data instanceof Object ? http.getQueryString(data) : data;
        return (url.indexOf('?') !== -1) ? paramsStr : '?' + paramsStr;
    },
    // 获取ajax请求参数
    getQueryData: (data) => {
        if (!data) {
            return null;
        }
        if (typeof data === 'string') {
            return data;
        }
        if (data instanceof FormData) {
            return data;
        }
        return http.getQueryString(data);
    },
    // 把对象转为查询字符串
    getQueryString: (data) => {
        let paramsArr = [];
        if (data instanceof Object) {
            Object.keys(data).forEach(key => {
                let val = data[key];
                // todo 参数Date类型需要根据后台api酌情处理
                if (val instanceof Date) {
                    // val = dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
                }
                paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
            });
        }
        return paramsArr.join('&');
    }
}


export { HttpService} ;