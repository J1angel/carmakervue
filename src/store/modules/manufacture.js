import ManufacturerApi from '@/apilinks/manufacturer';


export const manufacture = {
    namespaced: true,
    state: {
        manufacturer:[],
        page:1,
        last_page:0,
        current_url:'',
        prev_url:''
    },

    getters:{
        current_manufacturer(state){
            return state.manufacturer
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
        SET_MANUFACTURER (state, value) {
            state.manufacturer.push(...value)
        },
        SET_MANUFACTURER2(state, value){
            state.manufacturer = value
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
        sermanufacturer({commit},d){
            ManufacturerApi.getmanufacturers(this.state.manufacture.page,d).then(response => {
                if (response.data.data.length !== 0 && this.state.manufacture.manufacturer.length !== 0){
                    commit("SET_MANUFACTURER", response.data.data)
                }else{
                    commit("SET_MANUFACTURER2", response.data.data)
                }

            }).catch(error => {
                console.log(error)
            })

        },
        sermanufacturer2({commit},d){
            ManufacturerApi.getmanufacturers(this.state.manufacture.page,d).then(response => {
                console.log(response)
                commit("SET_MANUFACTURER2", response.data.data)

            }).catch(error => {
                console.log(error)
            })

        },
        changepage({commit}){
            let a = this.state.manufacture.page + 1
            commit('SET_PAGE', a)
        },
        revertpage({commit}){
            commit('SET_PAGE', 1)
        },
    }

}

export default manufacture
