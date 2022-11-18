const getDefaultState = () => {
    return {
        tab:0,
    }
}
export const pageshis = {
    namespaced: true,
    state: {
        tab:0,
    },

    getters:{
        current_tab(state){
            return state.tab
        },
    },

    mutations:{
        SET_TAB (state, value) {
            state.tab = value
        },
        resetState(state) {
            Object.assign(state, getDefaultState())
        }
    },

    actions:{
        sertab({commit},key){
            commit("SET_TAB", key)
        },
        resetState({commit}){
            commit('resetState')
        }
    }



}

export default pageshis
