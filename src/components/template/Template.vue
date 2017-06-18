<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    <!-- <ul>
    <router-link :to="'home'">to home</router-link>
  </ul> -->
  <filter-bar></filter-bar>
  <vuetable ref="vuetable"
  api-url="http://localhost:8090/template/lookup"
  data-path="data"
  pagination-path=""
  detail-row-component="my-detail-row"
  no-data-template="Нет информации для отображения"
  @vuetable:cell-clicked="onCellClicked"
  :fields="fields"
  :per-page="20"
  :multi-sort="false"
  :sort-order="sortOrder"
  :append-params="moreParams"
  :query-params="{ sort: 'sort_order', page: 'page_no', perPage: 'page_size' }"
  ></vuetable>
  <div class="vuetable-pagination ui basic segment grid">
    <vuetable-pagination-info
    ref="paginationInfo"
    no-data-template="..."
    ></vuetable-pagination-info>
    <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
  </div>
</div>
</template>

<script>
// import accounting from 'accounting'
// import moment from 'moment'
import Vue from 'vue'

import CustomActions from './CustomActions'
import FilterBar from './FilterBar.vue'
import DetailRow from './DetailRow'

import VueEvents from 'vue-events'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

Vue.use(VueEvents)
Vue.component('custom-actions', CustomActions)
Vue.component('my-detail-row', DetailRow)
Vue.component('filter-bar', FilterBar)

export default {
  name: 'template',
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
    return {
      msg: 'Поиск шаблонов',
      fields: [{
        name: 'id',
        title: 'Номер шаблона',
        titleClass: 'center aligned',
        dataClass: 'center aligned'
      }, {
        name: 'name',
        title: 'Название',
        titleClass: 'right aligned',
        dataClass: 'right aligned'
      }, {
        name: 'seller',
        title: 'Сайт',
        callback: 'urlLink'
      }, {
          name: '__component:custom-actions',   // <----
          title: 'Действия',
          titleClass: 'center aligned w150',
          dataClass: 'center aligned'
        }],
      sortOrder: [
        {
          field: 'id',
          sortField: 'id',
          direction: 'asc'
        }
      ],
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
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onAction (action, data, index) {
      console.log('slot action: ' + action, data.name, index)
    },
    onCellClicked (data, field, event) {
      console.log('cellClicked: ', field.name)
      if (field.name != 'seller')
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onFilterSet (filterText) {
      if (filterText.length > 1 || filterText.length == 0) {
        this.moreParams.name = filterText
        Vue.nextTick( () => this.$refs.vuetable.refresh() )
      }
    },
    onFilterReset () {
      delete this.moreParams.name
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    }
  }
}
</script>

<style>
.w150 {
  width: 150px;
}

.vuetable th#_id {
  width: 150px;
  max-width: 200px;
  min-width: 100px;
}

.card {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.link {
  display: inline-block;
  line-height: 1;
  vertical-align: baseline;
  margin: 0 .14285714em;
  border: 0 solid transparent;
  border-radius: .28571429rem;
  -webkit-transition: background .1s ease;
  transition: background .1s ease;
  box-sizing: inherit;
  height: 2.1666em!important;
}
</style>
