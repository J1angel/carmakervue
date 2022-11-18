<template>
  <div>
    <nav-bar></nav-bar>

    <v-main>
      <CarMakerPage :items="items" ></CarMakerPage>
      <!-- Provides the application the proper gutter -->
    </v-main>
  </div>


</template>
<script>
import CarMakerPage from "@/components/carpage/CarMakerPage";

export default{
  name: 'HomePage',
  components:{
    CarMakerPage,
  },
  data () {
    return {
      items: [
        'Cars', 'Manufacturers', 'Types', 'Colors'
      ],
    }
  },
}
</script>
