<template>
  <div class="custom-actions">
    <button class="ui basic button" @click="itemAction('/template/view', rowData, rowIndex)"><i class="zoom icon"></i>
    </button>
    <button class="ui basic button" @click="itemAction('/template/edit', rowData, rowIndex)"><i class="edit icon"></i>
    </button>
    <button class="ui basic button" @click="itemAction('/template/delete', rowData, rowIndex)"><i
      class="delete icon"></i></button>
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
      itemAction (path, data, index) {
        this.$router.push({path: path, query: {id: data.id}})
        console.log('custom-actions: ' + path, data.id, index)
      }
    }
  }
</script>

<style>
  .custom-actions button.ui.button {
    padding: 8px 8px;
  }

  .custom-actions button.ui.button > i.icon {
    margin: auto !important;
  }
</style>
