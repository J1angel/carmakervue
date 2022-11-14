import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from "@/views/LoginPage"
import HomePage from "@/views/HomePage"

Vue.use(VueRouter)


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
    },
]
const router = new VueRouter({
    mode: 'history',
    routes: routes
})


export default router
