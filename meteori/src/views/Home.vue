<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col cm="6" >
          <tabela/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src



import Tabela from "@/components/tabela";

export default {
  name: 'Home',
  components: {
    Tabela,
  }
}
</script>
