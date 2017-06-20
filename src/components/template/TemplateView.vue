<template>
  <div>
    <div class="row">

      <form id="edit-template" action="#" class="form-signin">
        <div class="col-md-3 col-sm-3">
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
  import Chrome from 'vue-color/src/components/Chrome.vue'
  import PhotoUpload from 'vue-photo-upload'
  import ModalColorPicker from './ModalColorPicker'

  import Lookup from './Lookup'

  Vue.use(VueEvents)
  Vue.use(PhotoUpload);
  Vue.component('lookup', Lookup)
  Vue.component('chrome-picker', Chrome)
  Vue.component('modal', ModalColorPicker)

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
        colors: {hex: '#FFFFFF'}
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
</style>
