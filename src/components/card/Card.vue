<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <h1>{{ msg }}</h1>
      <filter-bar></filter-bar>
      <vuetable ref="cardTable"
                api-url="http://localhost:8090/card/lookup"
                data-path="data"
                pagination-path=""
                detail-row-component="detail-card-row"
                no-data-template="Нет информации для отображения"
                @vuetable:cell-clicked="onCellClicked"
                :fields="fields"
                :multi-sort="false"
                :append-params="moreParams"
                :query-params="{ sort: 'sort_order', page: 'page_no', perPage: 'page_size' }"
      ></vuetable>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  import CustomCardActions from './CustomCardActions'
  import DetailCardRow from './DetailCardRow'
  import FilterCardBar from './FilterCardBar.vue'

  import VueEvents from 'vue-events'
  import Vuetable from 'vuetable-2/src/components/Vuetable'

  Vue.use(VueEvents)
  Vue.component('custom-card-actions', CustomCardActions)
  Vue.component('detail-card-row', DetailCardRow)
  Vue.component('filter-card-bar', FilterCardBar)

  export default {
    name: 'card',
    components: {
      Vuetable
    },
    data () {
      return {
        msg: 'Управление картами',
        fields: [{
          name: 'user.fio',
          title: 'ФИО',
          sortField: 'id',
          titleClass: 'right aligned',
          dataClass: 'right aligned',
          direction: 'asc'
        }, {
          name: 'barcode',
          title: 'Штрихкод',
          titleClass: 'right aligned',
          dataClass: 'right aligned'
        }, {
          name: 'dueDate',
          title: 'Дата окончания'
        }, {
          name: 'template.name',
          title: 'Продавец'
        }, {
          name: 'template.seller.name',
          title: 'Шаблон'
        }],
        moreParams: {}
      }
    },
    mounted () {
      this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
      this.$events.$on('filter-reset', e => this.onFilterReset())
    },
    methods: {
      allcap (value) {
        return value.toUpperCase()
      },
      convertToIcon (value) {
        return value === 'active' ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
      },
      urlLink (value) {
        return '<a target="_blank" class="link" href="' + value.url + '"><img class="link" src="' + value.logo + '" /></a>'
      },
      formatNumber (value) {
        return accounting.formatNumber(value, 2)
      },
      formatDate (value, fmt = 'D MMM YYYY') {
        return (value == null)
          ? ''
          : moment(value, 'YYYY-MM-DD').format(fmt)
      },
      onChangePage (page) {
        this.$refs.cardTable.changePage(page)
      },
      onAction (action, data, index) {
        console.log('slot action: ' + action, data.name, index)
      },
      onCellClicked (data, field, event) {
        console.log('cellClicked: ', field.name)
        if (field.name != 'seller')
          this.$refs.cardTable.toggleDetailRow(data.id)
      },
      onFilterSet (filterText) {
        if (filterText.length > 1 || filterText.length == 0) {
          this.moreParams.search = filterText
          Vue.nextTick(() => this.$refs.cardTable.refresh())
        }
      },
      onFilterReset () {
        delete this.moreParams.name
        Vue.nextTick(() => this.$refs.cardTable.refresh())
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
