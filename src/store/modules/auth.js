import router from '@/routes';
import LoginApi from '@/apilinks/loginapi'
import store from "@/store";

const getDefaultState = () => {
    return {
        isAuthenticated: false,
        userinfo:{},
        bearer:'',
        statusmessge:''
    }
}

export const authuser = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        userinfo:{},
        bearer:'',
        statusmessge:''
    },

    getters:{
        isAuthenticated(state) {
            return state.isAuthenticated
        },
        curr_user(state){
            return state.userinfo
        },
        curr_bearer(state){
            return state.bearer
        },
        curr_statusmessage(state){
            return state.statusmessge
        }
    },

    mutations:{
        isAuthenticated(state,value) {
            state.isAuthenticated = value
        },
        user(state,value){
            state.userinfo = value
        },
        bearer(state,value){
            state.bearer = value
        },
        statusmessge(state,value) {
            state.statusmessge = value
        },
        resetState(state) {
            Object.assign(state, getDefaultState())
        }
    },

    actions:{
      login({commit},credentials){
          console.log(credentials)
          if (store.getters["authuser/isAuthenticated"]){
              router.push({name:'homepage'})
          }else {
              LoginApi.login(credentials).then(response => {
                  commit('bearer', response.data)
                  LoginApi.user().then(response => {
                      commit('user', response.data)
                      commit('isAuthenticated', true)
                      router.push({name:'homepage'})
                  }).catch(error => {
                      commit('statusmessge',error.response.data.error)
                  })
              }).catch(error => {
                  commit('statusmessge',error.response.data.error)
              })
          }
      },
        logoutuser({commit}){
            commit('resetState')
            store.dispatch('cars/resetState')
            store.dispatch('color/resetState')
            store.dispatch('manufacture/resetState')
            store.dispatch('pageshis/resetState')
            store.dispatch('type/resetState')
            router.push('/')
        }
    }
}

export default authuser
