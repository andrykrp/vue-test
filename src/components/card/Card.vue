<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    <ul>
      <router-link :to="'home'">to home</router-link>
    </ul>
    <vuetable ref="vuetable"
    api-url="http://localhost:8090/card/1/card"
    :fields="fields"
    data-path="data"
    pagination-path=""
    ></vuetable>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
  name: 'card',
  data () {
    return {
      msg: 'card page',
      fields: [{
        name: '__checkbox',
        title: '#',
        titleClass: 'center aligned',
        dataClass: 'right aligned'
      },{
        name: 'id',
        title: 'ИД',
        sortField: 'id',
        titleClass: 'right aligned',
        dataClass: 'right aligned',
        direction: 'asc'
      }, {
        name: 'barcode',
        title: 'Штрихкод',
        titleClass: 'right aligned',
        dataClass: 'right aligned'
      }, {
        name: 'dueDate',
        title: 'Дата окончания',
        sortField: 'dueDate'
      }, {
        name: 'template.name',
        title: 'Продавец',
        sortField: 'template.name'
      }]
    }
  },
  components: {
    Vuetable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
