
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
    },

    actions:{
        sertab({commit},key){
            commit("SET_TAB", key)
        },
    }

}

export default pageshis
