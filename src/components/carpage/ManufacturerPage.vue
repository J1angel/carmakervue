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
        <v-col cols="1"><v-btn color="teal lighten-1" dark @click="add=!add"><v-icon>mdi-shape-plus</v-icon>&nbsp;ADD MANUFACTURER</v-btn></v-col>

      </v-card-text>
      <v-card-text  class="d-flex justify-center align-center" >
        <div  v-if="manufacturer1.length !== 0" :style="'width:600px;height:500px;border: 1px solid grey;'">
          <v-card-text>
            <v-list-item v-for="(item,i) in manufacturer1" :key="`${i}-${item.id}`">
              <v-list-item-content align="left">
                <v-list-item-title>
                  {{i+1}}. {{item.name}}<br>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action-text>
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
                        <v-btn  color="teal lighten-1" @click="deletemanufacturer({id:item.id})" small>OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>

                    </v-sheet>
                  </div>
                  <v-icon slot="reference" color="red">
                    mdi-delete
                  </v-icon>
                </popper>

              </v-list-item-action-text>
            </v-list-item>
          </v-card-text>

        </div>
        <div v-else class="d-flex justify-center align-center">
          <p style="font-size: xx-large">No Data Avaliable</p>
        </div>
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
          >CREATE MANUFACTURER</v-toolbar>
          <v-card-text><br><br>
            <v-text-field label="Manufacturer" v-model="manufactureradd.name" outlined></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="teal lighten-1" dark @click="addmanufacturer"
            >Create</v-btn>
            <v-btn
                text
                @click="dialog.value = false"
            >Close</v-btn>

          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>

</template>
<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
import {get} from 'vuex-pathify'
import {mapActions} from "vuex";
import ManufactureApi from "@/apilinks/manufacturer"
export default {
  name: 'HelloWorld',
  components:{
    "popper": Popper,
  },
  data() {
    return {
      benched: 0,
      toggle_exclusive: null,
      search:{
        data:''
      },
      manufactureradd:{
        name:''
      },
      add:false
    }
  },
  computed:{
    manufacturer1:get('manufacture/manufacturer'),
    page:get('manufacture/page'),
    last_page:get('manufacture/last_page')
  },
  filters: {
    highlight: function(value, query){
      return value.replace(new RegExp(query, "ig"), '<span class=\'blue\'>' + query + '</span>')
    },
  },
  watch:{
    'search.data': {
      handler(newVal) {
        let d = {data:newVal}
        this.manufacturer2(d)
        this.revertpage()
      },
      deep: true
    },
  },
  created() {
    this.manufacturer2(this.search)
  },
  methods:{
    ...mapActions({
      manufacturer:'manufacture/sermanufacturer',
      manufacturer2:'manufacture/sermanufacturer2',
      revertpage:'manufacture/revertpage',
      changepage:'manufacture/changepage'
    }),
    handleScrolledToBottom(isVisible){
      if (isVisible){
        if (this.page < this.last_page){
          this.getpageadd()
          this.manufacturer(this.search)
        }
      }
    },
    getmanufacturers(){
      this.manufacturer2(this.search)
    },
    getpageadd(){
      this.changepage()
    },
    addmanufacturer(){
      ManufactureApi.addmanufacturers(this.manufactureradd).then(response => {
        this.add = false
        console.log(response.data)
        this.manufacturer2(this.search)
      }).catch(error => {
        console.log(error)
      })
    },
    deletemanufacturer(item){
      ManufactureApi.deletemanufacturers(item).then(response => {
        console.log(response.data)
        this.manufacturer2(this.search)
      }).catch(error => {
        console.log(error)
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

