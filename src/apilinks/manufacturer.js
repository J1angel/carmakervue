import Api from '@/axios';
import store from '@/store';

export default {
    getmanufacturers(page,data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post(`/auth/getmanufacturers?page=${page}`,data)
    },
    addmanufacturers(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post('/auth/addmanufacturers',data)
    },
    deletemanufacturers(data){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post('/auth/deletemanufacturers',data)
    },

}
