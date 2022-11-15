<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                      prepend-icon="mdi-account"
                      v-model="credentials.username"
                      label="Username"
                      type="text"
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="mdi-lock"
                      v-model="credentials.password"
                      label="Password"
                      type="password"
                  ></v-text-field>
                </v-form>
                <p style="color: darkred">{{message}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from "vuex";
import {get} from 'vuex-pathify'
export default {
  name: 'LoginPage',

  data: () => ({
    credentials:{
      username:'',
      password:''
    }
  }),

  computed:{
    message:get('authuser/statusmessge'),
  },
  methods:{
    ...mapActions({
      logincred:'authuser/login'
    }),
    login(){
      this.logincred(this.credentials)
    }
  }
};
</script>
