import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from "./routes"
import store from "./store"
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false

Vue.use(router)
Vue.use(VueTheMask)
Vue.component('nav-bar', require('./components/NavigationView.vue').default);
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),

}).$mount('#app')
