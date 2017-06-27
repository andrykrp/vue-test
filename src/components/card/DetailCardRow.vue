<template>
  <div @click="onClick">
    <div class="inline field">
      <label><b>Ид: </b></label>
      <span>{{rowData.id}}</span>
    </div>
    <div class="inline field">
      Раздел дополнительной информации
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
