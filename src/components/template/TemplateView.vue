<template>
  <div>

    <range-modal-add v-if="showRangeAddPanel" @close="saveRange">
      <div slot="header">
        Добавить диапазон
      </div>
      <div id="range-add-body"  slot="body">
        <div class="row">
          <div class="form-group col-xs-5" style="text-align: left;">
            <label for="range-start">Начало</label>
            <input type="text" class="form-control" id="range-start">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-xs-5" style="text-align: left;">
            <label for="range-end">Окончание</label>
            <input type="text" class="form-control" id="range-end">
          </div>
        </div>
      </div>
    </range-modal-add>

    <div class="row">
      <div id="edit-template" class="form-signin">
        <div class="col-md-3 col-sm-3" style="padding-bottom: 20px;">
          <photo-upload
            buttonClass="btn btn-primary"
            :enableEdits="true"
            :photoDefault="this.template.photo"
            :showMessages="true"
            @photo-change="onPhotoChanged"
          ></photo-upload>

          <div style="text-align: center">

            <span id="show-modal" class="button-text button-color-picker" @click="showModal = true"
                  :style="{'border-bottom-color': template.color}">Задать базовый цвет</span>
            <modal v-if="showModal" @close="showModal = false; template.color = colors.hex">
              <chrome-picker v-model="colors" slot="body"></chrome-picker>
            </modal>

          </div>

          <div class="range-add-button">
            <span class="glyphicon glyphicon-plus range-add" data-toggle="tooltip" title="Добавить диапазон" @click="showRangeAddPanel = true"></span>
          </div>
        </div>

        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
          <div class="row row-top-padded">
            <div id="template-name" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col">
              <label>Имя шаблона</label>
              <input name="template-name" type="text" v-model="template.name" class="form-control" style=""
                     placeholder="Имя шаблона">
            </div>
            <div id="template-seller" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col">
              <label>Выбор селлера</label>
              <lookup v-model="template.seller.id" :selectedItem="template.seller.id"></lookup>
            </div>
            <div class="row" style="display: inline">
              <div id="template-submit" class="col-lg-6 col-md-6 col-sm-6 col-xs-6 col">
                <div id="submit-form-template" class="btn btn-sm btn-success">Применить</div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 col" style="margin: 0 auto; text-align: center">
                <!--<div id="template-range-add" class="btn btn-sm btn-danger" style="float: right; ">+</div>-->

              </div>
            </div>

            <div id="ranges-view-block" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col">
              <vuetable ref="rangesViewTable"
                        id="ranges-view-vable"
                        :api-url="'http://localhost:8090/template/ranges?id=' + this.template.id"
                        data-path="data"
                        pagination-path=""
                        no-data-template="Диапазоны не определены"
                        :fields="fields"
                        :multi-sort="false"
                        :append-params="moreParams"
                        @vuetable:cell-clicked="onCellClicked"
                        detail-row-component="RangeDetailRow"
                        :query-params="{ sort: 'sort_order', page: 'page_no', perPage: 'page_size' }"
              ></vuetable>
            </div>

          </div>
        </div>
      </div>

      <div id="template-seller-description" class="col-md-4 col-sm-4">
        <div class="template-title">
          <div class="btn-group" data-toggle="buttons-checkbox">
            <input id="template-state-change" type="checkbox" class="collapsed" data-toggle="toggle"
                   data-onstyle="success" data-offstyle="danger" data-size="mini">
          </div>
          <div class="text-bold">{{ template.name }}</div>
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

  import Chrome from 'vue-color/src/components/Chrome'
  import PhotoUpload from './PhotoUpload'
  import ModalColorPicker from './ModalColorPicker'
  import DetailRow from './DetailRow'
  import RangeDetailRow from './../range/RangeDetailRow'
  import RangeModalEdit from './../range/RangeModalEdit'

  import Lookup from './Lookup'

  Vue.use(VueEvents)
  Vue.component('photo-upload', PhotoUpload);
  Vue.component('vuetable', Vuetable)
  Vue.component('lookup', Lookup)
  Vue.component('chrome-picker', Chrome)
  Vue.component('modal', ModalColorPicker)
  Vue.component('my-detail-row', DetailRow)
  Vue.component('RangeDetailRow', RangeDetailRow)
  Vue.component('range-modal-add', RangeModalEdit);

  export default {
    name: 'tview',

    props: {},

    data () {
      return {
        msg: 'Просмотр / редактирование шаблона',
        template: [],
        sellers: null,
        showModal: false,
        showRangeAddPanel: false,
        colors: [],
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
          name: 'state',
          title: 'Состояние',
          callback: 'convertToIcon'
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
      this.loadData()
    },
    mounted () {
      this.createElements()
    },
    methods: {
      saveRange () {
        var self = this;
        console.log('rowData', self.rowData)
        console.log('templ', self.$parent.$parent.template)
        this.showRangeAddPanel = false;
        $.get('http://localhost:8090/template/range/add?templateId=' + self.template.id + '&start=' + $('#range-start').val() + '&end=' + $('#range-end').val())
          .then(function (response) {
            self.$refs.rangesViewTable.refresh()
          })
      },
      convertToIcon (value) {
        return value === 'active' ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
      },
      onPhotoChanged: function (e, file) {
        var _color = 'A'
        if (this.template.color != undefined && this.template.color != null) {
          _color = this.template.color.replace('\#', '');
        }
        this.template.photo = 'http://placehold.it/300x300/' + _color + '/ffffff?text=' + encodeURIComponent(this.template.name);
        console.log('upload', this.template.image)
      },
      loadData: function () {
        var self = this

        $.ajax({
          type: "GET",
          async: false,
          url: 'http://localhost:8090/template/' + self.$route.query.id,
          data: JSON.stringify(self.template),
          success: function (response) {
            self.template = response
            self.colors = {hex: response.color}
            if (!self.template.photo) {
              self.template.photo = 'http://placehold.it/300x300/D/ffffff?text=no+image'
            }
            if (!self.template.seller) {
              self.template.seller = {id: 0}
            }
          }
        });
      },
      createElements: function () {
        var self = this;

        $('#template-state-change')
          .bootstrapToggle(self.template.state === 'active' ? 'on' : 'off')
          .change(function () {
            $.get('http://localhost:8090/template/state?templateId=' + self.template.id + '&state=' + $(this).prop('checked'))
              .then(function (response) {
              })
          });

        $("#submit-form-template").click(function () {
          $.ajax({
            type: "POST",
            url: 'http://localhost:8090/template/update',
            contentType: 'application/json',
            data: JSON.stringify(self.template),
            dataType: 'json',
            success: function (response) {
              self.template = response
              $.notify({
                title: 'Шаблон <strong>' + response.name + '</strong>',
                message: 'успешно сохранён'
              }, {
                type: 'success',
                delay: 2000,
                timer: 500
              });
            }
          });
        });

      },
      onCellClicked (data, field, event) {
        if (field.name != 'seller')
          this.$refs.rangesViewTable.toggleDetailRow(data.id)
      }
    }
  }
</script>

<style>

  @media only screen and (max-width: 1200px) {
    #template-name, #template-seller, #template-submit, #ranges-view-block {
      padding-left: 50px;
    }
  }

  @media only screen and (max-width: 992px) {
    #template-name, #template-seller, #template-submit, #ranges-view-block {
      padding-left: 100px;
    }
  }

  #range-add-body input {
    width: auto;
  }

  .range-add-button {
    padding: 25px 0;
    cursor: pointer;
    text-align: center;
  }

  .range-add:hover {
    cursor: pointer;
    text-align: center;
    -webkit-transition: background .5s ease-in-out, padding .5s ease-in-out;
    -moz-transition: background .5s ease-in-out, padding .5s ease-in-out;
    transition: background .5s ease-in-out, padding .5s ease-in-out;
    padding-bottom: 5px;
    border-bottom: solid 2px lightsalmon;
    background-color: transparent;
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

  .template-title {
    margin: 0 0 10px;
  }

  div.template-title > div.text-bold {
    display: inline;
    padding-left: 15px;
  }

  div.template-title > div.btn-group {
    display: block;
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

    .ui.table#ranges-view-vable:not(.unstackable) tbody {
      float: right !important;
    }

    .ui.table#ranges-view-vable:not(.unstackable) tr {
      float: right !important;
      cursor: pointer;
    }

    .ui.table#ranges-view-vable:not(.unstackable) tbody,
    .ui.table#ranges-view-vable:not(.unstackable) tr,
    .ui.table#ranges-view-vable:not(.unstackable) tr > td {
      width: auto !important;
      display: inline-block;
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
      text-align: center;
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

  @media all and (max-width: 992px) {
    #ranges-view-block {
      display: inline !important;
    }

    .ui.table#ranges-view-vable:not(.unstackable) tbody,
    .ui.table#ranges-view-vable:not(.unstackable) tr,
    .ui.table#ranges-view-vable:not(.unstackable) tr > td {
      width: auto !important;
      display: block !important;
      padding: 2px 3px;
      margin: 2px 15px;
    }
  }

  @media all and (max-width: 767px) {
    #template-seller-description {
      display: none;
    }
  }
</style>
