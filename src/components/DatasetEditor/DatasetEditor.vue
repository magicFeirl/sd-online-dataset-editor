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
      <el-image fit="contain" @click="showPromptEditor(item)" v-for="item in dataset" :src="item.url"></el-image>
    </ImageList>
  </BaseEditor>

  <PromptEditor ref="PromptEditorRef"></PromptEditor>
</template>

<script setup>
import { Search, ArrowDown } from '@element-plus/icons-vue'
import * as TagUtil from '@/utils/tag.js'

import ImageList from '@/components/ImageList/ImageList.vue'
import BaseEditor from '@/components/DatasetEditor/BaseEditor.vue'
import PromptEditor from '@/components/DatasetEditor/PromptEditor.vue'


/**
 * data: {
 *  id: Number
 *  dataset: {
 *    text: String
 *    image: String
 *    type: "text" | "image"
 *    url: String
 *    raw: File
 *   }
 * }
 * 
*/
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const dataset = computed(() => props.data.imageList)
const tagList = computed(() => props.data.tagList)
const tags = computed(() => TagUtil.countTags(tagList.value.map(tag => tag.tags)))

const PromptEditorRef = ref()
const showPromptEditor = (selectedImage) => {
  const tagObj = tagList.value.find(tag => tag.name === selectedImage.name) || []
  PromptEditorRef.value.open({
    url: selectedImage.url,
    tags: tags.value.filter(tagCount => tagObj.tags.includes(tagCount.name))
  })
}

</script>

<style lang="scss" scoped>
.el-input {
  margin-bottom: 1rem;
}

.el-image {
  cursor: pointer;
  height: 20vh;
}
</style>