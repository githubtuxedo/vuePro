import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'


import Coupon from '@/components/common/Coupon'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Router)

const router = new Router({
        routes: [{
                path: '/',
                name: 'index',
                // component: () => import('@/pages/index'), 单独打包文件
            component: () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/pages/index'), //指定打包文件名 遇到两个chunk名相同的则合并
            // component: (resolve) => { require(['@/pages/index'], resolve) }
            }, {
                path: '/test',
                component: (resolve) => { require(['@/pages/test'], resolve) }
            },
            {
                path: '/register',
                component: (resolve) => { require(['@/pages/register/register'], resolve) }
            },
            {
                path: '/login',
                name: 'login',
                component: (resolve) => { require(['@/components/login/Login'], resolve) }
            },
            {
                path: '/home',
                // component: () => import('@/components/common/CustomTool'),
                component: (resolve) => { require(['@/components/common/CustomTool'], resolve) },
                children: [{
                        path: '/home/a',
                    // component: () => import('@/components/Home/Index'),
                    component: (resolve) => { require(['@/components/Home/Index'], resolve) },
                        requireAuth: true,
                    },
                    { path: '/home/b', component: Coupon },
                    // 动态路径参数 以冒号开头
                    {
                        path: '/home/user/:userId',
                        name: 'user',
                        // component: () => import('@/components/User/user'),
                        component: (resolve) => { require(['@/components/User/user'], resolve) },
                    }
                ]
            }
        ]
    })
    // 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {
        if (localStorage.getItem('username')) {
            console.log('should not be here')
            next()
        } else {
            next({
                path: '/Register',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

export default router