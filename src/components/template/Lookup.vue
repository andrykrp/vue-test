<template>
  <div >
    {{selectedItem}}
    <select2 :value="selectedItem" class="select2-lookup">
      <option disabled value="0">Выберите один</option>
    </select2>
  </div>
</template>

<script>
import Vue from 'vue'

import Select2 from './Select2'
Vue.component('select2', Select2)

export default {
  name: 'lookup',
  props: ['selectedItem'],
  data () {
    return {
      //  val: null
    }
  },

  created: function () {
    this.fetchData()
  },

  watch: {
    current: 'fetchData'
  },

  methods: {
    fetchData: function () {
      var self = this
      $.get('http://localhost:8090/seller').then(function (response) {

        var vm = this

        $('.select2-lookup')
        .select2({
          data: $.map(response, function (item) {
            return {
              text: item.name,
              id: item.id
            }
          })
        })
        .val(self.$route.query.id)
        .trigger('change')
        .on('change', function () {
          // self.val = this.value;
          vm.$emit('input', this.value)
        })

        // $(".select2-lookup");
      })
    }
  },
  mounted () {
    $(this.$el).ready(() => {
      // $('.select2-lookup').on('change', (e) => {
      //   this.$emit('select', e.target.value)
      // })
    })
  },
  watch: {
    value: function (value) {
      // update value
      $(this.$el).val(value).trigger('change');
    },
    options: function (options) {
      // update options
      $(this.$el).select2({ data: options })
    }
  },
  destroyed: function () {
    $(this.$el).off().select2('destroy')
  }
}
</script>
