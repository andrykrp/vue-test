<template>
  <div>

    <ul>
      <router-link :to="'home'">to home</router-link>
    </ul>

    <h1>{{ msg }} [ {{ template.name }} {{ val }}]</h1>

    <form id="edit-template" action="#" class="form-signin">

      <div>
        <div class="row">
          <div class="col-sm-2 photo">

            <photo-upload
              buttonClass="btn btn-primary"
              :enableEdits="true"
              :photoDefault="'http://eseniakapustina.ru/wp-content/uploads/2015/04/10648500.png'"
              :showMessages="true"
              @photo-submit="photo_upload"
              @photo-change="photo_changed"
            />

          </div>

          <div class="col-sm-8">

            <div class="row row-data">
              <div class="col-sm-3 label-right">
                Имя шаблона
              </div>
              <div class="col-sm-5">
                <input type="text" v-model="template.name" class="form-control" style="text-align: center"
                       placeholder="Имя шаблона">
              </div>
            </div>

            <div class="row row-data">
              <div class="col-sm-3 label-right">
                Выбор селлера
              </div>
              <div class="col-sm-5">
                <lookup :selectedItem="val"></lookup>
              </div>
            </div>

            <div class="row row-data">
              <div class="col-sm-3 label-right">Дата создания</div>
              <div class="col-sm-5">{{template.createdDate}}</div>
            </div>

            <div class="row row-data">
              <div class="col-sm-3 label-right">Дата последнего изменения</div>
              <div class="col-sm-5">{{template.updatedDate}}</div>
            </div>
          </div>


        </div>
        <!--<div class="row row-data">-->
          <!---->
          <!---->
        <!--<div class="col-sm-3 label-right">Выбор продавца</div>-->
        <!--<div class="col-sm-6">-->
        <!--<lookup :selectedItem="val"></lookup>-->
        <!--</div>-->
        <!--</div>-->



      </div>
      <!--<div class="row">-->
      <!--<div class="col-sm-2">&nbsp;</div>-->
      <!--<div class="col-sm-9" style="float: right">-->
      <!--<div class="row row-data">-->
      <!--<div class="col-sm-3 label-right">&nbsp;</div>-->
      <!--<div class="col-sm-6">-->
      <!--<chrome-picker v-model="colors"></chrome-picker>-->
      <!--</div>-->
      <!--</div>-->

      <!--</div>-->
      <!--</div>-->
      <!--</div>-->

      <input type="submit" class="btn btn-lg btn-success" value="Применить">
    </form>

    <form id="disable-template" action="#">
      <input type="submit" class="btn btn-lg btn-success" value="Отключить шаблон">
    </form>
  </div>
</template>

<script>

  import Vue from 'vue'
  import VueEvents from 'vue-events'
  import Chrome from 'vue-color/src/components/Chrome.vue'
  import PhotoUpload from 'vue-photo-upload'

  import Lookup from './Lookup'

  Vue.use(VueEvents)
  Vue.use(PhotoUpload);
  Vue.component('lookup', Lookup)
  Vue.component('chrome-picker', Chrome)

  export default {
    name: 'tview',

    props: {},

    data () {
      return {
        msg: 'Просмотр / редактирование шаблона',
        template: {name: '', seller: {id: ''}, color: 'ffffff'},
        sellers: null,
        val: null,
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
          self.colors = {hex: '#' + response.color}
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
  .photo {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    margin: auto;
    padding: 5px;
  }

  .label-right {
    text-align: right;
    min-height: 30px;
    padding-top: 10px;
  }

  .row-data {
    margin-top: 5px;
  }
</style>
