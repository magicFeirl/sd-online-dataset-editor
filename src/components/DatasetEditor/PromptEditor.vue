<template>
  <BaseEditor :tags="tags">
    <template #left-top>
      <el-input :rows="7" type="textarea">
      </el-input>
    </template>

    <template #right-top>
      <el-icon>
        <CircleClose @click="handleClose" />
      </el-icon>
    </template>

    <el-image src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"></el-image>
  </BaseEditor>
</template>

<script setup>
import { CircleClose } from '@element-plus/icons-vue'

import BaseEditor from '@/components/DatasetEditor/BaseEditor.vue'

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

const tags = [
  {
    name: '1girl',
    count: 20,
  },
  {
    name: '1girl',
    count: 20,
  },
  {
    name: '1girl',
    count: 20,
  },
  {
    name: '1girl',
    count: 20,
  }
]
</script>

<style lang="scss" scoped>
.base-editor {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1234;
  padding: 20px;
  width: 100vw;
  height: 100vh;
}

.el-textarea {
  margin-bottom: 2rem;
}

.el-icon {
  color: white;
  cursor: pointer;
  font-size: 24px;
}
</style>