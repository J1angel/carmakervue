<template>
  <div>
    <v-app-bar
        app
        absolute
        color="white"
        elevation="1"
        height="100"
    >

      <v-icon size="100px" color="teal lighten-1">mdi-car-estate</v-icon>

      <v-toolbar-title style="font-size: x-large" v-if="!$vuetify.breakpoint.mobile">Car Maker</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn color="teal lighten-1" v-if="authenticate" dark @click="logout">LOG OUT</v-btn>
    </v-app-bar>
  </div>

</template>
<script>
import {get} from "vuex-pathify";
import store from "@/store";
export default {
  computed:{
    authenticate:get('authuser/isAuthenticated')
  },
  watch:{
    'authenticate':{
      handler(newVal) {
        console.log(newVal)
      },
      deep: true
    },
  },
  methods:{
    logout(){
      store.dispatch('authuser/logoutuser')
    }
  }
}

</script>
