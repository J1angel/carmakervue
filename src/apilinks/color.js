import Api from '@/axios';
import store from '@/store';

export default {
    getcolors(page,data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post(`/auth/getcolors?page=${page}`,data)
    },
    addcolors(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post('/auth/addcolors',data)
    },
    deletecolors(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post('/auth/deletecolors',data)
    },

}
