import Api from '@/axios';
import store from '@/store';

export default {
    login(data){
        return Api().post('/auth/login', data)
    },
    user(){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post('/auth/me',{})
    }
}
