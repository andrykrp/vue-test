<template>
  <div :id="'range-details-' + rowData.id" class="range-edit">
    <div>
      <range-modal-edit v-if="showModal" @close="showModal = false"></range-modal-edit>
      <span :id="'range-data-edit-' + rowData.id" :data-template-id="rowData.id" @click="showModal = true"
            class="glyphicon glyphicon-pencil"></span>
    </div>
    <div class="btn-group" data-toggle="buttons-checkbox">
      <input :id="'range-data-state-' + rowData.id" type="checkbox" class="collapsed" data-toggle="toggle"
             data-onstyle="success" data-offstyle="danger" data-size="mini">
    </div>
  </div>
</template>

<script scoped>
  import Vue from 'vue'
  import RangeModalEdit from './RangeModalEdit'

  Vue.component('range-modal-edit', RangeModalEdit);

  export default {
    data () {
      return {
        showModal: false
      }
    },
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },
    mounted: function () {
      var self = this;
      console.log('created', 'range-data-state-' + self.rowData.id)
      $('#range-data-state-' + self.rowData.id)
        .bootstrapToggle(self.rowData.state === 'active' ? 'on' : 'off')
        .change(function () {
          $.get('http://localhost:8090/template/range/state?rangeId=' + self.rowData.id + '&state=' + $(this).prop('checked'))
            .then(function (response) {
              self.rowData.state = response.state
            })
        });
    }
  }
</script>

<style>
  .range-edit > div {
    display: inline;
  }

  .range-edit > div:first-child {
    padding: 0 5px;
  }

  .range-edit > div:last-child {
    display: inline;
    padding: 0 0 0 10px;
  }

  .range-edit > div:first-child:hover {
    text-align: center;
    -webkit-transition: background .5s ease-in-out, padding .5s ease-in-out;
    -moz-transition: background .5s ease-in-out, padding .5s ease-in-out;
    transition: background .5s ease-in-out, padding .5s ease-in-out;
    padding-bottom: 5px;
    border-bottom: solid 2px lightsalmon;
    background-color: transparent;
  }
</style>
