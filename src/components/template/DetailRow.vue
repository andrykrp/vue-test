<template>
  <div @click="onClick">
    <div class="inline field">
      <label><b>Идентификатор в системе: </b></label>
      <span>{{rowData.id}}</span>
    </div>
    <div class="inline field">
      <label><b>Название: </b></label>
      <span>{{rowData.name}}</span>
    </div>
    <div class="inline field">
      <label><b>Дата создания шаблона: </b></label>
      <span>{{rowData.seller.createDate}}</span>
    </div>
    <div class="inline field">
      <label><b>Дата последнего обновления шаблона: </b></label>
      <span>{{rowData.seller.updatedDate}}</span>
    </div>
    <div class="inline field">
      <label><b>Описание: </b></label>
      <br />
      <span>{{rowData.seller.description}}</span>
    </div>
  </div>
</template>

<script>
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
  methods: {
    onClick (event) {
      console.log('my-detail-row: on-click', event.target)
    }
  },
}
</script>
