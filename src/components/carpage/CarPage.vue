<template>
  <div>
    <v-card
        elevation="16"
        class="mx-auto"
    >
      <v-card-text class="mb-12 d-flex justify-center align-center" >
        <v-col cols="8">
          <v-text-field label="Search" v-model="search.data"></v-text-field>
        </v-col>
        <v-col cols="1"><v-btn color="teal lighten-1" dark @click="openmodal"><v-icon>mdi-shape-plus</v-icon>&nbsp;ADD CAR</v-btn></v-col>

      </v-card-text>
      <v-card-text  class="d-flex justify-center align-center" >
        <v-card-text>
          <div  v-if="cars.length !== 0">
              <v-row>
                <v-col
                    cols="12"
                    sm="4"
                    v-for="(item, i) in cars" :key="`${i}-${item.id}`" align="center" style="font-size: xx-large"
                >
                  <v-hover
                      v-slot="{ hover }"
                      open-delay="200"
                  >
                    <v-card

                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                        class="mx-auto text-center d-flex flex-column align-center justify-center"
                        height="200"
                        max-width="250"
                        :color="item.color.colorcode"
                    >
                      <v-sheet color="color3">
                        <v-card-text class="text-left">
                          Name: {{item.name}}<br>
                          Manufacturer: {{item.manufacturer.name}}<br>
                          Type: {{item.type.name}}<br>
                          Color: {{item.color.name}}
                          <popper
                              trigger="clickToOpen"
                              :options="{
                  placement: 'top',
                  modifiers: { offset: { offset: '0,10px' } }
                }">
                            <div class="popper">
                              <v-sheet
                                  color="grey lighten-5"
                                  height="75"
                                  width="200"
                              >
                                <div style="font-size: 12px; line-height: 1.2em;"> </div>
                                <div style="font-size: 12px; line-height: 1.2em;">Are you sure you want to delete this item?</div>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn  color="teal lighten-1" @click="deletecars({id:item.id})" small>OK</v-btn>
                                  <v-spacer></v-spacer>
                                </v-card-actions>

                              </v-sheet>
                            </div>
                            <v-icon slot="reference" color="red">
                              mdi-delete
                            </v-icon>
                          </popper>
                        </v-card-text>
                      </v-sheet>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>

            </div>

          <div v-else class="d-flex justify-center align-center">
            <p style="font-size: xx-large">No Data Avaliable</p>
          </div>
        </v-card-text>

        <div v-observe-visibility="handleScrolledToBottom"></div>
      </v-card-text>
    </v-card>

    <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="add"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
              color="teal lighten-1"
              dark
          >CREATE CAR</v-toolbar>
          <v-card-text><br><br>
            <v-text-field label="Car Name" v-model="caradd.name" outlined></v-text-field>
            <v-combobox
                v-model="caradd.manufacturer"
                :items="manufacturers"
                label="Manufacturer"
                outlined
                dense
                item-text="name"
                item-value="id"
            >
              <template v-slot:item="{ item }">
                {{ item.name}}
              </template>
            </v-combobox>
            <v-combobox
                v-model="caradd.type"
                :items="types"
                label="Type"
                outlined
                dense
                item-text="name"
                item-value="id"
            >
              <template v-slot:item="{ item }">
                {{ item.name}}
              </template>
            </v-combobox>
            <v-combobox
                v-model="caradd.color"
                :items="colors"
                label="Color"
                outlined
                dense
                item-text="name"
                item-value="id"
            >
              <template v-slot:item="{ item }">
                <v-chip :color="item.colorcode" >{{item.name}}</v-chip>
              </template>
            </v-combobox>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="teal lighten-1" dark @click="addcars"
            >Create</v-btn>
            <v-btn
                text
                @click="dialog.value = false"
            >Close</v-btn>

          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-snackbars :objects.sync="objects"  top right>
      <template v-slot:default="{ message }">
        <v-layout align-center pr-4>
          <v-icon class="pr-3" dark large>mdi-robot-angry</v-icon>
          {{ message }}
        </v-layout>
      </template>
    </v-snackbars>
    <v-snackbars :objects.sync="objectss"  top right>
      <template v-slot:default="{ message }">
        <v-layout align-center pr-4>
          <v-icon class="pr-3" dark large>mdi-hand-okay</v-icon>
          {{ message }}
        </v-layout>
      </template>
    </v-snackbars>
  </div>

</template>
<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
import {get} from 'vuex-pathify'
import {mapActions} from "vuex";
import CarsApi from "@/apilinks/cars"
import OptionsApi from "@/apilinks/options"
import VSnackbars from "v-snackbars";
export default {
  name: 'HelloWorld',
  components:{
    "popper": Popper,
    "v-snackbars": VSnackbars,
  },
  data() {
    return {
      benched: 0,
      toggle_exclusive: null,
      search:{
        data:''
      },
      caradd:{
        name:'',
        manufacturer:null,
        type:null,
        color: null
      },
      types:[],
      manufacturers: [],
      colors:[],
      add:false,
      objects:[],
      objectss:[]

    }
  },
  computed:{
    cars:get('cars/cars'),
    page:get('cars/page'),
    last_page:get('cars/last_page'),
  },
  watch:{
    'search.data': {
      handler(newVal) {
        let d = {data:newVal}
        this.sercars2(d)
        this.revertpage()
      },
      deep: true
    },
  },
  created() {
    this.sercars2(this.search)
  },
  methods:{
    ...mapActions({
      sercars:'cars/sercars',
      sercars2:'cars/sercars2',
      revertpage:'cars/revertpage',
      changepage:'cars/changepage'
    }),
    handleScrolledToBottom(isVisible){
      if (isVisible){
        if (this.page < this.last_page){
          this.getpageadd()
          this.sercars(this.search)
        }
      }
    },
    getcars(){
      this.sercars2(this.search)
    },
    getpageadd(){
      this.changepage()
    },
    addcars(){
      CarsApi.addcars(this.caradd).then(response => {
        this.add = false
        this.objectss.push({
          message: response.data.message,
          color:"green darken-2",
          timeout:3000
        })

        this.caradd={
          name:'',
              manufacturer:null,
              type:null,
              color: null
        }
        this.sercars2(this.search)
      }).catch(error => {
        this.objects.push({
          message:error.response.data.message,
          color:"red darken-4",
          timeout:3000
        })
      })
    },
    openmodal(){
      OptionsApi.getoptions().then(response => {
        this.manufacturers = response.data.optionsM
        this.colors = response.data.optionsC
        this.types = response.data.optionsT
      }).catch(error => {
        this.objects.push({
          message:error.response.data.message,
          color:"red darken-4",
          timeout:3000
        })
      })
      this.add = true

    },
    deletecars(item){
      CarsApi.deletecars(item).then(response => {
        this.objectss.push({
          message: response.data.message,
          color:"green darken-2",
          timeout:3000
        })
        this.sercars2(this.search)
      }).catch(error => {
        this.objects.push({
          message:error.response.data.message,
          color:"red darken-4",
          timeout:3000
        })
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

