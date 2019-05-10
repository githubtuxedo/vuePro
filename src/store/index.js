import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);


import {login_store, tab_store} from "./login_store.js";

export default new vuex.Store({
    modules: {
        login: login_store,
        tab: tab_store,
    }
})