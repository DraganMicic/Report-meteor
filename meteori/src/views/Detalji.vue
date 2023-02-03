<template>
  <b-container >
    <b-row align-h="center" >
      <b-col lg="4">
        <h2 style="text-align: center">Detalji o selektovanom meteoru:</h2>
      </b-col>
    </b-row>

    <b-row align-h="center" >
      <b-col lg="2">
        <h3 style="text-align: right; color: #42b983">Id:</h3>
      </b-col>
      <b-col lg="2">
        <h3 style="text-align: left">{{ meteor.id }}</h3>
      </b-col>
    </b-row>

    <b-row align-h="center" >
      <b-col lg="2">
        <h3 style="text-align: right; color: #42b983">Datum:</h3>
      </b-col>
      <b-col lg="2">
        <h3 style="text-align: left">{{ meteor.datum.substring(0,10) }}</h3>
      </b-col>
    </b-row>

    <b-row align-h="center" >
      <b-col lg="2">
        <h3 style="text-align: right; color: #42b983">Vreme:</h3>
      </b-col>
      <b-col lg="2">
        <h3 style="text-align: left">{{ meteor.vreme}}</h3>
      </b-col>
    </b-row>

    <b-row align-h="center" >
      <b-col lg="2">
        <h3 style="text-align: right; color: #42b983" >Mesto:</h3>
      </b-col>
      <b-col lg="2">
        <h3  style="text-align: left">{{ meteor.mesto }}</h3>
      </b-col>
    </b-row>

    <b-row align-h="center" >
      <b-col lg="2">
        <h3 style="text-align: right; color: #42b983" >Magnituda:</h3>
      </b-col>
      <b-col lg="2">
        <h3 id="mag" style="text-align: left">{{ meteor.magnituda }}</h3>
      </b-col>
    </b-row>

    <b-row cols="4" align-h="center"  >
        <b-button variant="dark" @click="nazad" >Nazad</b-button>
    </b-row>
  </b-container>
</template>

<script>
import {mapState} from 'vuex';
import router from "@/router";
  export default {
    name: "Details",
    data() {
      return {
        edit: false
      }
    },
    computed:{
      ...mapState(['meteors']),

      meteor: function (){
        for (let i = 0; i < this.meteors.length; i++){
          if (this.meteors[i].id === parseInt(this.$route.params.id)){
            return  this.meteors[i];
          }

        }

        return null;
      }
    },
    methods: {
      nazad: function () {
        router.push({path: `/`})
      }
    }
  }
</script>

<style scoped>

</style>