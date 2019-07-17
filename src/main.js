// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.js'
import router from './router'

import CNZH from './i18n/lang/cn'
import ENUS from './i18n/lang/en'

import VueI18n from 'vue-i18n'

// import store from './store'

// window.http = new (require('./assets/js/http').HttpService)();

// let fileSaver = require('./assets/js/plugin/FileSaver');
import  saveAs  from './assets/js/plugin/FileSaver';
// window.saveAs = saveAs;

class LazyManClass{
  constructor(name){
    console.log(`hi i am ${name}`);
    this.taskList = [];
    this.index = -1;
    setTimeout(()=>{
      this.next();
    },0)
  }
  sleep(time){
    var that = this;
    var fn = (function (t) {
      return function () {
        setTimeout(() => {
          console.log(`waiting ${time}s`)
          that.next();
        }, t*1000);
      }
    })(time);
    this.taskList.push(fn);
    return this;
  }
  eat(name){
    var that = this;
    var fn = function(name){
      return function() {
        console.log(`i am eating ${name}`);
        that.next();
      }
    }(name);
    this.taskList.push(fn);
    return this;
  }
  next(){
    console.log(this.taskList);
    var fn = this.taskList.shift();
    fn && fn();
  }
}
function LazyMan(name) {
  return new LazyManClass(name);
}
// LazyMan('Tony').sleep(10).eat('apple');


Vue.use(VueI18n) // 通过插件的形式挂载
const i18n = new VueI18n({
  // locale: 'zh-CN',    // 语言标识
  locale: 'en-US',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': CNZH,   // 中文语言包
    // 'zh-CN': require('./i18n/lang/cn'),   // 中文语言包
    'en-US': ENUS    // 英文语言包
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  // store,
  components: { App },
  template: '<App/>'
})

// 热更新
// if (module.hot) {
//   module.hot.accept(['./en', './cn'], function () {
//     i18n.setLocaleMessage('en', require('./en').default)
//     i18n.setLocaleMessage('ja', require('./cn').default)
//     // 同样可以通过 $i18n 属性进行热更新
//     // app.$i18n.setLocaleMessage('en', require('./en').default)
//     // app.$i18n.setLocaleMessage('ja', require('./ja').default)
//   })
// }