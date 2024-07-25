<template>
    <div class="d-flex" v-bind:class="direction">
      <slot></slot>
    </div>
</template>

<script setup>
  defineProps({
    direction:String
  })
</script>

<style scoped>
.d-flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.row{
  flex-direction: row;
}
.column{
  flex-direction: column;
}
</style>
