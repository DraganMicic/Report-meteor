<template>
  <div>
    <b-table
        hover
        v-if="meteors.length"
        sticky-header="800px"
        :items="meteors"
        :fields="fields"
        outlined head-variant="dark"
        @row-clicked="details">
      <template v-slot:cell(akcije)="row">
              <b-button  variant="dark" @click="delete_meteor(row.item.id)">Obriši</b-button>
              <b-button  variant="success" @click="edit(row.item)">Izmeni</b-button>
      </template>
    </b-table>
    <h1 v-else>No messages</h1>
  </div>
</template>


<script>
  import router from "@/router";
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "tabela",
    computed: {
      ...mapState(['meteors'])
    },
    data() {
      return {
        fields: [
          { key: 'id', sortable: true },
          { key: 'datum',
            sortable: true,
            formatter: (value, key, item) => {
              return item.datum.substring(0,10)
            }
          },
          { key: 'vreme', sortable: true },
          { key: 'mesto', sortable: true },
          { key: 'magnituda', sortable: true },
          { key: 'akcije'}

        ]
      }
    },
    methods:{
      ...mapActions(['delete_meteor']),
      // eslint-disable-next-line no-unused-vars
      details: function (item, index, event) {
        router.push({path: `/details/${item.id}`})
      },
      // eslint-disable-next-line no-unused-vars
      edit: function (item, index, event) {
        router.push({path: `/edit/${item.id}`})
      }


    }
  }
</script>

<style scoped>
button {
  margin-right :3px; margin-left: 3px}

</style>