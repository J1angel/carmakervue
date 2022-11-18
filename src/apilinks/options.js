import Api from '@/axios';
import store from '@/store';

export default {
    getoptions(){
        Api().defaults.headers.common["Authorization"] = `Bearer ${store.state.authuser.bearer.access_token}`;
        return Api().post(`/auth/optionscar`,{})
    },

}
