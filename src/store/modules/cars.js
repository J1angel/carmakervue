import CarApi from '@/apilinks/cars';

const getDefaultState = () => {
    return {
        cars:[],
        page:1,
        last_page:0,
        current_url:'',
        prev_url:''
    }
}
export const manufacture = {
    namespaced: true,
    state: {
        cars:[],
        page:1,
        last_page:0,
        current_url:'',
        prev_url:''
    },

    getters:{
        current_cars(state){
            return state.cars
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
        SET_CARS (state, value) {
            state.cars.push(...value)
        },
        SET_CARS2(state, value){
            state.cars = value
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
        sercars({commit},d){
            CarApi.getcars(this.state.cars.page,d).then(response => {
                if (response.data.data.length !== 0 && this.state.cars.cars.length !== 0){
                    commit("SET_CARS", response.data.data)
                }else{
                    commit("SET_CARS2", response.data.data)
                }

            }).catch(error => {
               console.log(error)
            })

        },
        sercars2({commit},d){
            CarApi.getcars(this.state.cars.page,d).then(response => {
                console.log(response)
                commit("SET_CARS2", response.data.data)

            }).catch(error => {
                console.log(error)
            })

        },
        changepage({commit}){
            let a = this.state.cars.page + 1
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

export default manufacture
