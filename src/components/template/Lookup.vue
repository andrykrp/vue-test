<template>
  <div class="lookup">
    <select :value="selectedItem" class="select2-lookup" >
      <option disabled value="0">Выберите один</option>
    </select>
  </div>
</template>

<script>
import Vue from 'vue'

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
        .val(self.$parent.template.seller.id)
        .trigger('change')
        .on('change', function () {
          self.$parent.template.seller.id = this.value
        })
      })
    }
  },
  watch: {
    value: function (value) {
      $(this.$el).val(value).trigger('change');
    },
    options: function (options) {
      $(this.$el).select2({ data: options })
    }
  },
  destroyed: function () {
    $(this.$el).off().select2('destroy')
  }
}
</script>

<style>
  select, .select2 {
    width: 90%;
    margin: 0 auto;
    border-radius: 0 !important;
    display: block;
  }

  .select2-container .select2-selection {
    height: 35px;
    overflow: hidden;
  }

  .lookup > span {
    width: 100%!important;
    /*height: 50px!important;*/
  }
  /*.select2-choices {*/
    /*min-height: 500px;*/
    /*max-height: 500px;*/
    /*overflow-y: auto;*/
  /*}*/
</style>
