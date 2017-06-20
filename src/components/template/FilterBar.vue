<template>
  <div id="filter-bar" class="filter-bar ui basic segment grid">
    <div class="ui form">
      <div class="inline field">
        <!-- <label></label> -->
        <input type="text" v-model="filterText" class="three wide column" @keyup="doFilter" placeholder="Строка поиска">
        <!-- <button class="ui primary button" @click="doFilter">Go</button> -->
        <button class="btn btn-sm btn-info" @click="resetFilter">Сброс</button>
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
  #filter-bar {
    float: right;
  }

  @media only screen and (max-width: 767px) {
    #filter-bar {
      float: left;
    }

    #filter-bar,
    #filter-bar > div,
    #filter-bar input{
      width: 100%;
      border: none;
    }

    #filter-bar > div {
      padding-left: 0;
    }

    #filter-bar button {
      display: none;
    }
  }
</style>
