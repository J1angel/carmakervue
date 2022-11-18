import Api from '@/axios';
import store from '@/store';

export default {
    getcars(page,data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post(`/auth/getcars?page=${page}`,data)
    },
    addcars(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post('/auth/addcars',data)
    },
    deletecars(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post('/auth/deletecars',data)
    },

}
