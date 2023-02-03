
<template>
  <b-container fluid >
        <b-row cols="3" align-h="center" >
          <b-datepicker v-model="ndatum" placeholder="dan"  />
        </b-row>
        <b-row cols="3" align-h="center"  >
            <b-form-timepicker v-model="nvreme" placeholder="vreme" />
        </b-row>
        <b-row cols="3" align-h="center" >
          <b-form-input v-model="nmesto" placeholder="mesto" />
        </b-row>
        <b-row cols="3" align-h="center" >
          <b-form-select v-model="nmagnituda" :options="options"></b-form-select>
        </b-row>
        <b-row cols="3" align-h="center" >
          <b-button variant="success" @click="addNew">Sačuvaj</b-button>
        </b-row>
  </b-container>

</template>

<script>
  import {mapActions} from 'vuex'
  import router from "@/router";


  export default {
    name: "unos",
    props:{
      meteor: {

      }
    },
    data(){
      return{
        ndatum: "",
        nvreme: "",
        nmesto: "",
        nmagnituda: null,
        options: [
          { value: null, text: 'magnituda (sjaj)' },
          { value: 5, text: '5' },
          { value: 4, text: '4' },
          { value: 3, text: '3' },
          { value: 2, text: '2' },
          { value: 1, text: '1' },
          { value: 0, text: '0' },
          { value: -1, text: '-1' },
          { value: -2, text: '-2' },
          { value: -3, text: '-3' },
          { value: -4, text: '-4' },
          { value: -5, text: '-5' },
          { value: -6, text: '-6' },
          { value: -7, text: '-7' },
          { value: -8, text: '-8' },
          { value: -9, text: '-9' },
          { value: -10, text: '-10' },
        ]
      }
    },
    mounted() {
      if(this.$route.params.id){
        this.ndatum = this.meteor.datum;
        this.nvreme = this.meteor.vreme;
        this.nmesto = this.meteor.mesto;
        this.nmagnituda = this.meteor.magnituda;
      }
    },
    methods:{
      ...mapActions(['new_meteor', 'change_meteor']),

      addNew:function (){
        const met = JSON.stringify({datum: this.ndatum, vreme: this.nvreme, mesto: this.nmesto, magnituda: this.nmagnituda});

          if(!this.$route.params.id)
            this.new_meteor(met);
          else{
            this.change_meteor({id: this.$route.params.id, meteor: met});
            router.push({path: `/`})
          }




          this.ndatum = "";
          this.nvreme = "";
          this.nmesto = "";
          this.nmagnituda = null;

      }
    }
  }
</script>

<style scoped>
.row{
  margin-bottom: 20px
}

</style>