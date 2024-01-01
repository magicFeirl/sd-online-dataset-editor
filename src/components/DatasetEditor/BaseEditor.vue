<template>
  <el-container class="base-editor">
    <el-aside width="250px">
      <div>
        <slot name="left-top"></slot>

        <div class="tag-list">
          <el-tag @click="handleTagClick" size="large" round v-for="tag in tags" :key="tag.name" :closable="tagClosable"
            :type="'success'">
            {{ tag.name }} {{ tag.count ? `(${tag.count})` : '' }}
          </el-tag>
        </div>
      </div>
    </el-aside>
    <el-main style="padding: 0;">
      <slot></slot>
    </el-main>

    <slot name="right-top"></slot>
  </el-container>
</template>

<script setup>
/**
 * tags = {
 *  name: String,
 *  count: Number
 * }
 * 
*/
const props = defineProps({
  tags: {
    type: Array,
    required: true
  },
  tagClosable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['tagClicked'])

const handleTagClick = (tag) => {
  emit('tagClicked')
}
</script>

<style lang="scss" scoped>
.el-container {
  padding-left: 20px;
}

.tag-list {
  display: flex;
  flex-flow: column;

  justify-content: start;

  .el-tag {
    align-self: flex-start;
    margin-bottom: 8px;
  }
}
</style>