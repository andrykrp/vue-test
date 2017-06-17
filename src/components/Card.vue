<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    <ul>
      <router-link :to="'home'">to home</router-link>
    </ul>
    <textarea :value="input" @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
Vue.component('card', {
  computed: {
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      }
  },
  methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
  }
})

export default {
  name: 'card',
  data () {
    return {
      msg: 'card page',
      input: '# hello'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea, .card div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
