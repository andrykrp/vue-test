<!--glyphicon bootstrap not showing-->
<template>
  <div>
    <div class="row">
      <form id="edit-template" action="#" class="form-signin">
        <div class="col-md-3 col-sm-3" style="padding-bottom: 20px;">
          <div class="photo photo-padded">
            <photo-upload
              buttonClass="btn btn-primary"
              :enableEdits="true"
              :photoDefault="'http://eseniakapustina.ru/wp-content/uploads/2015/04/10648500.png'"
              :showMessages="true"
              @photo-submit="photo_upload"
              @photo-change="photo_changed"
            ></photo-upload>
          </div>
          <div style="text-align: center">

            <span id="show-modal" class="button-text button-color-picker" @click="showModal = true"
                  :style="{'border-bottom-color': color}">Задать базовый цвет</span>
            <modal v-if="showModal" @close="showModal = false; color = colors.hex">
              <chrome-picker v-model="colors" slot="body"></chrome-picker>
            </modal>

          </div>
        </div>

        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
          <div class="row row-top-padded">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col">
              <label>Имя шаблона</label>
              <input type="text" v-model="template.name" class="form-control" style=""
                     placeholder="Имя шаблона">
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col">
              <label>Выбор селлера</label>
              <lookup :selectedItem="val"></lookup>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col">
              <input type="submit" class="btn btn-lg btn-success" value="Применить">
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col">
              <vuetable ref="rangesViewTable"
                        id="ranges-view-vable"
                        api-url="http://localhost:8090/template/ranges?id=2"
                        data-path="data"
                        pagination-path=""
                        no-data-template="Нет информации для отображения"
                        :fields="fields"
                        :multi-sort="false"
                        :append-params="moreParams"
                        @vuetable:cell-clicked="onCellClicked"
                        :query-params="{ sort: 'sort_order', page: 'page_no', perPage: 'page_size' }"
              ></vuetable>
            </div>

          </div>
        </div>
      </form>

      <div class="col-md-4">
        <div class="text-bold">{{ template.name }}
          <form id="disable-template" action="#">
            <input type="submit" class="button-text small" value="[X] Отключить шаблон">
          </form>
        </div>
        <p align="justify">{{ template.seller.description }}</p>
        <div class="text-bold" style="padding-bottom: 10px">Информация</div>
        <ul>
          <li>Дата создания шаблона [ {{template.createdDate}} ]</li>
          <li>Дата последнего изменения [ {{template.updatedDate}} ]</li>
        </ul>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-6">

      </div>
    </div>

    <div class="row">

      <div class="col-lg-12">
        <div class="page-header text-bold" style="font-size: large">Просмотрены ранее</div>
      </div>

      <div class="col-sm-3 col-xs-6">
        <a href="#">
          <img class="img-responsive portfolio-item" src="http://placehold.it/500x300" alt="">
        </a>
      </div>

      <div class="col-sm-3 col-xs-6">
        <a href="#">
          <img class="img-responsive portfolio-item" src="http://placehold.it/500x300" alt="">
        </a>
      </div>

      <div class="col-sm-3 col-xs-6">
        <a href="#">
          <img class="img-responsive portfolio-item" src="http://placehold.it/500x300" alt="">
        </a>
      </div>

      <div class="col-sm-3 col-xs-6">
        <a href="#">
          <img class="img-responsive portfolio-item" src="http://placehold.it/500x300" alt="">
        </a>
      </div>

    </div>
  </div>

</template>

<script>

  import Vue from 'vue'
  import VueEvents from 'vue-events'
  import Vuetable from 'vuetable-2/src/components/Vuetable'

  import Chrome from 'vue-color/src/components/Chrome.vue'
  import PhotoUpload from 'vue-photo-upload'
  import ModalColorPicker from './ModalColorPicker'
  import DetailRow from './DetailRow'

  import Lookup from './Lookup'

  Vue.use(VueEvents)
  Vue.use(PhotoUpload);
  Vue.component('vuetable', Vuetable)
  Vue.component('lookup', Lookup)
  Vue.component('chrome-picker', Chrome)
  Vue.component('modal', ModalColorPicker)
  Vue.component('my-detail-row', DetailRow)

  export default {
    name: 'tview',

    props: {},

    data () {
      return {
        msg: 'Просмотр / редактирование шаблона',
        template: {name: '', seller: {id: ''}, color: 'ffffff'},
        sellers: null,
        val: null,
        showModal: false,
        color: 'transparent',
        colors: {hex: '#FFFFFF'},
        fields: [{
          name: 'id',
          title: 'ИД',
          titleClass: 'center aligned w100',
          dataClass: 'center aligned',
          visible: false
        }, {
          name: 'range_start',
          title: 'Начало',
          titleClass: 'right aligned',
          dataClass: 'right aligned'
        }, {
          name: 'range_end',
          title: 'Окончание',
          titleClass: 'right aligned',
          dataClass: 'right aligned'
        }],
        moreParams: {}
      }
    },
    created: function () {
      this.fetchData()
    },

    watch: {
      currentBranch: 'fetchData'
    },

    methods: {
      photo_upload: function (e, file) {
        console.log(e, file)
      },
      photo_changed: function (e, file) {
        console.log(e, file)
      },
      fetchData: function () {
        var self = this
        $.get('http://localhost:8090/template/' + this.$route.query.id).then(function (response) {
          self.template = response
          self.color = '#' + response.color
          self.colors = {hex: response.color}
          console.log(response)
        })
      },
      onCellClicked (data, field, event) {
        if (field.name != 'seller')
          this.$refs.rangesViewTable.toggleDetailRow(data.id)
      }
    }
  }
</script>

<style>
  .photo {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    margin: auto;
    padding: 5px;
  }

  .photo-padded {
    padding: 5px;
    margin: 5px -2px 15px;
  }

  .text-bold {
    font-weight: 400;
    font-size: x-large;
  }

  .row-top-padded > .col {
    padding-bottom: 15px;
  }

  form.vue-photo-upload-form {
    text-align: center;
    min-height: 185px;
  }

  form.vue-photo-upload-form > canvas {
    width: 100% !important;
  }

  span.select2-selection__rendered {
    margin: 3px 7px;
  }

  span.select2-selection__arrow {
    padding: 17px 15px
  }

  .button-text {
    border: 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
  }

  .small {
    font-size: x-small;
    padding-bottom: 15px;
  }

  form#disable-template {
    padding: 0;
    margin: 0;
    border: 0;
  }

  .button-color-picker {
    padding-bottom: 5px;
    border-bottom: double 10px transparent;
  }

  @media all {
    .ui.table#ranges-view-vable:not(.unstackable) {
      width: 100%;
    }

    .ui.table#ranges-view-vable:not(.unstackable),
    .ui.table#ranges-view-vable:not(.unstackable) tr.vuetable-detail-row,
    .ui.celled.table#ranges-view-vable tr td,
    .ui.celled.table#ranges-view-vable tr th {
      border: none;
    }

    .ui.celled.table#ranges-view-vable tr td:first-child {
      border-right: 1px solid rgba(34, 36, 38, .1) !important;
    }

    .ui.table#ranges-view-vable:not(.unstackable) tr {
      float: right;
      cursor: pointer;
    }

    .ui.table#ranges-view-vable:not(.unstackable) tbody,
    .ui.table#ranges-view-vable:not(.unstackable) tr,
    .ui.table#ranges-view-vable:not(.unstackable) tr > td {
      width: auto !important;
      display: inline-block !important;
    }

    .ui.selectable.table#ranges-view-vable tbody tr:hover,
    .ui.table#ranges-view-vable tbody tr td.selectable:hover {
      background: rgba(0, 0, 0, .05) !important;
      color: rgba(0, 0, 0, .95) !important;
    }

    .ui.selectable.table#ranges-view-vable tbody tr.vuetable-detail-row:hover,
    .ui.table#ranges-view-vable tbody tr.vuetable-detail-row td.selectable:hover {
      background: none !important;
      color: rgba(0, 0, 0, .95) !important;
      border: none;
    }

    .ui.table#ranges-view-vable:not(.unstackable) thead,
    .ui.table#ranges-view-vable:not(.unstackable) tfoot,
    .ui.table#ranges-view-vable:not(.unstackable) tr > th {
      display: none;
    }

    .ui.table#ranges-view-vable:not(.unstackable) {
      padding: 0;
    }

    .ui.table#ranges-view-vable:not(.unstackable) tr {
      padding-top: 1em;
      padding-bottom: 1em;
      box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.1) inset !important;
    }

    .ui.table#ranges-view-vable:not(.unstackable) tbody > tr {
      background: none;
      border: 1px solid rgba(34, 36, 38, .1) !important;
      border-radius: 25px;
      box-shadow: 0px -2px 2px 0px rgba(0, 0, 0, 0.15) inset !important;
      padding: 3px !important;
      margin: 3px 2px !important;
    }

    .ui.table#ranges-view-vable:not(.unstackable) tbody > tr.vuetable-detail-row {
      background: none;
      border: none !important;
      border-radius: 0;
      box-shadow: none !important;
    }

    .ui.table#ranges-view-vable:not(.unstackable) th:first-child,
    .ui.table#ranges-view-vable:not(.unstackable) td:first-child {
      font-weight: normal;
    }
  }
</style>
