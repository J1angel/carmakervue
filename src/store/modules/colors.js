import ColorApi from '@/apilinks/color';


export const color = {
    namespaced: true,
    state: {
        colors:[],
        page:1,
        last_page:0,
        current_url:'',
        prev_url:''
    },

    getters:{
        current_color(state){
            return state.color
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
        SET_COLOR (state, value) {
            state.colors.push(...value)
        },
        SET_COLOR2(state, value){
            state.colors = value
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
        }
    },

    actions:{
        sercolor({commit},d){
            ColorApi.getcolors(this.state.color.page,d).then(response => {
                if (response.data.data.length !== 0 && this.state.color.length !== 0){
                    commit("SET_COLOR", response.data.data)
                }else{
                    commit("SET_COLOR2", response.data.data)
                }

            }).catch(error => {
                console.log(error)
            })

        },
        sercolor2({commit},d){
            ColorApi.getcolors(this.state.color.page,d).then(response => {
                console.log(response)
                commit("SET_COLOR2", response.data.data)

            }).catch(error => {
                console.log(error)
            })

        },
        changepage({commit}){
            let a = this.state.color.page + 1
            commit('SET_PAGE', a)
        },
        revertpage({commit}){
            commit('SET_PAGE', 1)
        },
    }

}

export default color
