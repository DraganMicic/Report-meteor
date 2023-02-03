<template>
  <div class="edit">
    <b-container>
      <b-row align-h="center" >
        <b-col lg="4">
          <h2 style="text-align: center">Izmena prijavljenog meteora:</h2>
        </b-col>
      </b-row>
        <b-row>
            <unos :meteor="meteorX"/>
        </b-row>
      <b-row cols="3" align-h="center" >
        <b-button variant="dark" @click="odustani">Odustani</b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import Unos from "@/components/unos";
  import {mapState} from 'vuex';
  import router from "@/router";
  export default {
    name: "Izmeni",
    components: {
        Unos
    },
    data() {
      return {
        edit: false
      }
    },computed: {
      ...mapState(['meteors']),


      meteorX: function () {
        for (let i = 0; i < this.meteors.length; i++)
          if (this.meteors[i].id === parseInt(this.$route.params.id))
            return this.meteors[i];
        return null;
      }
    },methods: {
      odustani: function () {
        router.push({path: `/`})
      }
    }
  }
</script>

<style scoped>

</style>