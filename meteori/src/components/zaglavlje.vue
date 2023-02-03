<template>

  <div>
    <div style="background-image: url('https://news.cgtn.com/news/2020-08-13/Live-Perseid-meteor-shower-creates-dazzling-night-sky-SV0Pj5NBy8/img/a3d9e9ae1afb438a9e22bcdadd31502c/a3d9e9ae1afb438a9e22bcdadd31502c.png');">
      <br>
      <h1 style="text-align:left; color: white; font-size: 500%; padding-left: 10px" > Prijavi meteor! </h1>
      <h1 style="text-align:left; color: white; font-size: 150%; padding-left: 10px" > Video si meteor? Prijavi ga i doprinesi njihovom istraživanju! </h1>
      <br>
    </div>
    <div id="nav">
      | <router-link to="/">Pregled do sada privaljenih metora</router-link> |
      <router-link to="/prijavi">Prijavi meteor</router-link> |
      <router-link to="/magnitudes">Kako odrediti magnitudu</router-link> |
    </div>
    <p id="demo"></p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "zaglavlje",
    computed:{
      ...mapState(['meteors'])

    },

  }


</script>

<style scoped>


</style>