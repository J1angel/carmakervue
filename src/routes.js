import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from "@/views/LoginPage"
import HomePage from "@/views/HomePage"
import store from "@/store";
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueRouter)
Vue.use(VueObserveVisibility)


const routes = [
    {
        path: '/',
        component: LoginPage,
        name: 'loginPage',
    },
    {
        path: '/homepage',
        component: HomePage,
        name: 'homepage',
        beforeEnter: (to, from, next) => {
            if (store.state.authuser.isAuthenticated && store.state.authuser.bearer){
                next()
            }else{
                router.push('/')
            }
        }
    },
]
const router = new VueRouter({
    mode: 'history',
    routes: routes
})


export default router
