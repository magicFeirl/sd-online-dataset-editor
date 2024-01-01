<template>
  <BaseEditor :tagClosable="true" :tags="dataset.tags" v-if="visible">
    <template #left-top>
      <el-input v-model="tagsText" :rows="12" type="textarea">
      </el-input>
    </template>

    <template #right-top>
      <el-icon>
        <CircleClose @click="handleClose" />
      </el-icon>
    </template>

    <el-image :src="dataset.url"></el-image>
  </BaseEditor>
</template>

<script setup>
import { CircleClose } from '@element-plus/icons-vue'

import BaseEditor from '@/components/DatasetEditor/BaseEditor.vue'

const emit = defineEmits(['close'])

const visible = ref(false)
const dataset = ref({
  url: "",
  tags: []
})

const tagsText = ref("")

watch(() => dataset.value.tags, () => {
  tagsText.value = dataset.value.tags.map(tagObj => tagObj.name).join(', ')
})

defineExpose({
  open(_dataset) {
    visible.value = true
    dataset.value = _dataset
  }
})

const handleClose = () => {
  visible.value = false
  emit('close')
}
</script>

<style lang="scss" scoped>
.base-editor {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1234;
  width: 100vw;
  height: 100vh;
}

.el-textarea {
  margin-bottom: 1rem;
}

.el-icon {
  color: white;
  cursor: pointer;
  font-size: 24px;
}
</style>