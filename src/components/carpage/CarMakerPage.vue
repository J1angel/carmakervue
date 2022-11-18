<template>
  <div>
    <v-tabs
        v-model="current_tab"
        align-with-title
        background-color="blue-grey lighten-4"

    >
      <v-tabs-slider color="teal lighten-1"></v-tabs-slider>

      <v-tab
          v-for="(item,k) in items"
          :key="k"
          @click="handleTab(k)"
          active-class="active"
      >
        {{ item }}
      </v-tab>
    </v-tabs>


    <v-tabs-items v-model="current_tab">
      <v-tab-item>
        <v-card flat>
          <CarPage ref="stud"></CarPage>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <ManufacterPage ref="stud1"></ManufacterPage>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <TypePage ref="stud2"></TypePage>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <ColorPage ref="stud3"></ColorPage>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>
<script>
import CarPage from "@/components/carpage/CarPage"
import ManufacterPage from "@/components/carpage/ManufacturerPage"
import TypePage from "@/components/carpage/TypePage"
import ColorPage from "@/components/carpage/ColorPage"
import store from "@/store";
import {mapActions} from "vuex";

export default {
  name:'CarMakePage',
  props:[
    'items'
  ],
  components:{
    CarPage,
    ManufacterPage,
    TypePage,
    ColorPage
  },
  data(){
    return {
      key0:0,
      key1:0,
      key2:0,
      key3:0,
    }
  },
  computed:{
    current_tab:{
      get: () => store.getters["pageshis/current_tab"],
      set: (value) => store.commit('pageshis/SET_TAB', value )
    },
  },

  methods:{
    ...mapActions({
      settab:'pageshis/sertab'
    }),
    handleTab(key) {
      this.settab(key)
      if (key === 0){
        this.key0++
        if (this.key0 > 1){
          this.$refs.stud.getcars();
        }
      }else if(key === 1){
        this.key1++
        if (this.key1 > 1){
          this.$refs.stud1.getmanufacturers();
        }
      }else if(key === 2){
        this.key2++
        if (this.key2 > 1){
          this.$refs.stud2.gettypes();
        }
      }else if(key === 3){
        this.key3++
        if (this.key3 > 1){
          this.$refs.stud3.getcolors();
        }
      }
    },
  }
}
</script>
<style>
.active {
  color: #26A69A !important;
  background-color: #ffff !important;
}
</style>
