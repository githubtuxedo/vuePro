// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.js'
import router from './router'

import m from './i18n/lang/cn'
import ENUS from './i18n/lang/en'

import VueI18n from 'vue-i18n'

// import store from './store'

// window.http = new (require('./assets/js/http').HttpService)();

// let fileSaver = require('./assets/js/plugin/FileSaver');
import  saveAs  from './assets/js/plugin/FileSaver';
// window.saveAs = saveAs;

Vue.use(VueI18n) // 通过插件的形式挂载
const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': m,   // 中文语言包
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