<template>
  <div class="btn-group" data-toggle="buttons-checkbox">
    <input :id="'range-data-' + rowData.id" type="checkbox" class="collapsed" data-toggle="toggle"
           data-onstyle="success" data-offstyle="danger" data-size="mini">
  </div>
</template>

<script scoped>
  import Vue from 'vue'

  export default {
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },
    created: function () {
      var self = this;
      $(function () {
        $('#range-data-' + self.rowData.id)
          .bootstrapToggle(self.rowData.state === 'active' ? 'on' : 'off')
          .change(function () {
            $.get('http://localhost:8090/template/range/state?rangeId=' + self.rowData.id + '&state=' + $(this).prop('checked'))
              .then(function (response) {
                self.rowData.state = response.state
              })
          });
      })
    }
  }
</script>
