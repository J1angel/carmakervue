import Vue from 'vue';
import Vuex from 'vuex';
import pathify from '@/plugins/vuetify-pathify'

import VuexPersistence from 'vuex-persist'

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });



import * as modules from './modules'



Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
    },
})

const store = new Vuex.Store({
    modules,
    plugins:[
        vuexLocal.plugin,
        pathify.plugin,

    ]
})


export default store
export const ROOT_DISPATCH = Object.freeze({ root: true })
