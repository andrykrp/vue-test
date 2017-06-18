<template>
  <div class="tview">
    <h1>{{ msg }} [ {{ template.name }} {{ val }}]</h1>
    <ul>
      <router-link :to="'home'">to home</router-link>
    </ul>

    <form id="target" action="destination.html">
      <input type="text" v-model="template.name" placeholder="Имя шаблона">
      <br />
      <input type="text" v-model="template.color" placeholder="Основной цвет дизайна">
      <div :style="{'background-color': '#' + template.color}">{{template.color}}</div>
      <br />
      <!-- <lookup :value="value" :item="template.seller.id"></lookup> -->
      <lookup :selectedItem="val"></lookup>
      <br />
      <span >Дата создания: {{template.createdDate}}</span>
      <br />
      <span >Дата последнего изменения: {{template.updatedDate}}</span>
      <br />
      <input type="submit" value="Применить">
    </form>
  </div>
</template>

<script>

import Vue from 'vue'
import VueEvents from 'vue-events'

import Lookup from './Lookup'

Vue.use(VueEvents)
Vue.component('lookup', Lookup)

export default {
  name: 'tview',
  data () {
    return {
      msg: 'Просмотр / редактирование шаблона',
      template: {name: '', seller: {id: ''}},
      sellers: null,
      val: null
    }
  },
  created: function () {
    this.fetchData()
  },

  watch: {
    currentBranch: 'fetchData'
  },

  methods: {
    fetchData: function () {
      var self = this
      $.get('http://localhost:8090/template/' + this.$route.query.id).then(function (response) {
        self.template = response
        self.val = this.$route.query.id
      })
      // $.get('http://localhost:8090/seller').then(function (response) {
      //   self.options = response
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tview {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
