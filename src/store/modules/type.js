import TypeApi from '@/apilinks/type';
const getDefaultState = () => {
    return {
        type:[],
        page:1,
        last_page:0,
        current_url:'',
        prev_url:''
    }
}

export const type = {
    namespaced: true,
    state: {
        type:[],
        page:1,
        last_page:0,
        current_url:'',
        prev_url:''
    },

    getters:{
        current_type(state){
            return state.type
        },
        page(state){
            return state.page
        },
        last_page(state){
            return state.last_page
        },
        current_url(state){
            return state.current_url
        },
        prev_url(state){
            return state.prev_url
        }
    },

    mutations:{
        SET_TYPE (state, value) {
            state.type.push(...value)
        },
        SET_TYPE2(state, value){
            state.type = value
        },
        SET_PAGE(state, value){
            state.page = value
        },
        SET_LASTPAGE(state, value){
            state.last_page = value
        },
        SET_CURRENTURL(state, value){
            state.current_url = value
        },
        SET_PREVURL(state, value){
            state.prev_url = value
        },
        resetState(state) {
            Object.assign(state, getDefaultState())
        }
    },

    actions:{
        sertype({commit},d){
            TypeApi.gettypes(this.state.type.page,d).then(response => {
                if (response.data.data.length !== 0 && this.state.type.type.length !== 0){
                    commit("SET_TYPE", response.data.data)
                }else{
                    commit("SET_TYPE2", response.data.data)
                }

            }).catch(error => {
                console.log(error)
            })

        },
        sertype2({commit},d){
            TypeApi.gettypes(this.state.type.page,d).then(response => {
                console.log(response)
                    commit("SET_TYPE2", response.data.data)

            }).catch(error => {
                console.log(error)
            })

        },
        changepage({commit}){
            let a = this.state.type.page + 1
            commit('SET_PAGE', a)
        },
        revertpage({commit}){
            commit('SET_PAGE', 1)
        },
        resetState({commit}){
            commit('resetState')
        }
    }

}

export default type
