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
        <v-col cols="1"><v-btn color="teal lighten-1" dark @click="add=!add"><v-icon>mdi-shape-plus</v-icon>&nbsp;ADD COLOR</v-btn></v-col>

      </v-card-text>
      <v-card-text  class="d-flex justify-center align-center" >
        <div  v-if="color.length !== 0" :style="'width:600px;height:500px;border: 1px solid grey;'">
          <v-card-text>
            <v-list-item v-for="(item,i) in color" :key="`${i}-${item.id}`">
              <v-list-item-content align="left">
                <v-list-item-title>
                  {{i+1}}. {{item.name}}<br>
                </v-list-item-title>
                <v-list-item-subtitle> &emsp;<v-chip :color="item.colorcode" >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</v-chip></v-list-item-subtitle>
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
                        <v-btn  color="teal lighten-1" @click="deletecolors({id:item.id})" small>OK</v-btn>
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
          >CREATE COLOR</v-toolbar>
          <v-card-text><br><br>
            <v-text-field label="Color Name" v-model="coloradd.name" outlined></v-text-field>
            <v-row justify="center" align="center">
              <v-col class="shrink" style="min-width: 220px;">
                <v-text-field v-model="coloradd.color" v-mask="mask" hide-details class="ma-0 pa-0" solo>
                  <template v-slot:append>
                    <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                      <template v-slot:activator="{ on }">
                        <v-btn :style="swatchStyle" v-on="on" :color="coloradd.color" ></v-btn>
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker v-model="coloradd.color" flat />
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="teal lighten-1" dark @click="addcolor"
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
import ColorApi from "@/apilinks/color"
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
      coloradd:{
        name:'',
        color: '#1976D2FF',
      },
      add:false,
      mask: '!#XXXXXXXX',
      menu: false,
    }
  },
  computed:{
    color:get('color/colors'),
    page:get('color/page'),
    last_page:get('color/last_page'),
    swatchStyle() {
      const { color, menu } = this
      return {
        backgroundColor: color,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    }
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
        this.sercolor2(d)
        this.revertpage()
      },
      deep: true
    },
  },
  created() {
    this.sercolor2(this.search)
  },
  methods:{
    ...mapActions({
      sercolor:'color/sercolor',
      sercolor2:'color/sercolor2',
      revertpage:'color/revertpage',
      changepage:'color/changepage'
    }),
    handleScrolledToBottom(isVisible){
      if (isVisible){
        if (this.page < this.last_page){
          this.getpageadd()
          this.sercolor(this.search)
        }
      }
    },
    getcolors(){
      this.sercolor2(this.search)
    },
    getpageadd(){
      this.changepage()
    },
    addcolor(){
      ColorApi.addcolors(this.coloradd).then(response => {
        this.add = false
        console.log(response.data)
        this.sercolor2(this.search)
      }).catch(error => {
        console.log(error)
      })
    },
    deletecolors(item){
      ColorApi.deletecolors(item).then(response => {
        console.log(response.data)
        this.sercolor2(this.search)
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

