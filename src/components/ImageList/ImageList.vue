<template>
  <div :style="{ 'grid-template-columns': `repeat(${column}, 1fr)` }" class="image-list">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  column: {
    type: Number,
    default: 4
  },
})
</script>

<style lang="scss" scoped>
.image-list {
  display: grid;
  gap: 20px;
}
</style>