<template>
  <BaseEditor :tags="tags">
    <template #left-top>
      <el-input size="small" clearable>
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </template>

    <ImageList>
      <el-image @click="showPromptEditor()" v-for="_ in 22"
        src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"></el-image>
    </ImageList>
  </BaseEditor>

  <PromptEditor @close="promptEditorVisible = false" v-if="promptEditorVisible"></PromptEditor>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import ImageList from '@/components/ImageList/ImageList.vue'

import BaseEditor from '@/components/DatasetEditor/BaseEditor.vue'
import PromptEditor from '@/components/DatasetEditor/PromptEditor.vue'

const promptEditorVisible = ref(false)
const showPromptEditor = () => {
  promptEditorVisible.value = true
}

const tags = [{
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
.el-input {
  margin-bottom: 2rem;
}

.el-image {
  cursor: pointer;
}
</style>