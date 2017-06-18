<template>
  <div class="filter-bar ui basic segment grid right">
    <div class="ui form">
      <div class="inline field">
        <!-- <label></label> -->
        <input type="text" v-model="filterText" class="three wide column" @keyup="doFilter" placeholder="Имя">
        <!-- <button class="ui primary button" @click="doFilter">Go</button> -->
        <button class="ui button" @click="resetFilter">Сбросить параметры поиска</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterText: ''
    }
  },
  methods: {
    doFilter () {
      console.log('doFilter:', this.filterText)
      this.$events.fire('filter-set', this.filterText)
    },
    resetFilter () {
      this.filterText = ''
      console.log('resetFilter')
      this.$events.fire('filter-reset')
    }
  }
}
</script>

<style scoped>
.right {
  float: right;
}
</style>
