module.exports = {

    login_store: {
        state: {
            show: false,
        },
        mutations: {                            //便于操作多个state,通过commit触发 此方法执行同步处理
            switch_login_state(state) {
                state.show = !state.show;
                console.log(state.show);
            }
        },
        actions: {                               //便于操作多个mutations,通过dispatch触发   此方法可执行异步处理
            switch_login_state(context) {       //context和使用$store拥有相同的对象和方法
                context.commit("switch_login_state");
                //这里还可以触发其他mutations方法
            }
        }
    },

    tab_store: {
        state: {
            active: true,
        },
        mutations: {
            switch_tab_state(state) {
                state.active = !state.active;
            }
        },
        actions: {
            switch_tab_state(context) {
                context.commit("switch_tab_state");
            }
        }
    }

}