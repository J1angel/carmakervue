<template>
  <v-app id="inspire">
    <div>
      <nav-bar></nav-bar>
      <v-main>

        <!-- Provides the application the proper gutter -->
        <v-container fluid style="height: 600px" class="mb-12 d-flex flex-column justify-center align-center">
          <v-main>
            <v-container fluid fill-height>
              <v-layout align-center justify-center>
                  <v-card class="elevation-12" width="500px">
                    <v-toolbar dark color="teal lighten-1">
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
                      <v-btn color="teal lighten-1" @click="login" dark>Login</v-btn>
                    </v-card-actions>
                  </v-card>
              </v-layout>
            </v-container>
          </v-main>

        </v-container>
      </v-main>
    </div>

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
