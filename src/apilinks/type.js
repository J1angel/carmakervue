import Api from '@/axios';
import store from '@/store';

export default {
    gettypes(page,data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post(`/auth/gettypes?page=${page}`,data)
    },
    addtypes(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post('/auth/addtypes',data)
    },
    deletetypes(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post('/auth/deletetypes',data)
    },

}
