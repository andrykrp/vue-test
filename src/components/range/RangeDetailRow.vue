<template>
  <div :id="'range-details-' + rowData.id" class="range-edit">
    <div>
      <range-modal-edit v-if="showModal" @close="saveRange">
        <div slot="header">
          Редактирование диапазона
        </div>
        <div id="range-edit-body" slot="body">
          <div class="row">
            <div class="form-group col-xs-5" style="text-align: left;">
              <label for="range-start">Начало</label>
              <input type="text" class="form-control" id="range-start" :value="rowData.range_start">
            </div>
          </div>
          <div class="row">
            <div class="form-group col-xs-5" style="text-align: left;">
              <label for="range-end">Окончание</label>
              <input type="text" class="form-control" id="range-end" :value="rowData.range_end">
            </div>
          </div>
        </div>
      </range-modal-edit>
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
//      console.log('created', 'range-data-state-' + self.rowData.id)
      $('#range-data-state-' + self.rowData.id)
        .bootstrapToggle(self.rowData.state === 'active' ? 'on' : 'off')
        .change(function () {
          $.get('http://localhost:8090/template/range/state?rangeId=' + self.rowData.id + '&state=' + $(this).prop('checked'))
            .then(function (response) {
              self.rowData.state = response.state
            })
        });
    },
    methods: {
      saveRange () {
        var self = this;
//        console.log('rowData', self.rowData)
//        console.log('templ', self.$parent.$parent.template)
        this.showModal = false;
        $.get('http://localhost:8090/template/range/edit?rangeId=' + self.rowData.id + '&start=' + $('#range-start').val() + '&end=' + $('#range-end').val())
          .then(function (response) {
            self.rowData.state = response.state
            self.$parent.refresh()
          })
      }
    }
  }
</script>

<style>
  #range-edit-body label {

  }

  #range-edit-body input {
    width: auto;
  }

  tr.vuetable-detail-row {
    padding: 12px 0;
  }

  tr.vuetable-detail-row > td:first-child {
    padding: 12px 0!important;
  }

  .range-edit > div {
    display: inline;
  }

  .range-edit > div:first-child {
    margin: 0 0 0 15px;
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
