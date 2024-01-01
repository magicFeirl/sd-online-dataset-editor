<template>
  <el-main>
    <div>
      <el-upload :show-file-list="false" accept=".jpg,.jpeg,.png,.txt" :auto-upload="false" v-model:file-list="fileList"
        class="upload-container" drag multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>

      <section class="info" v-show="fileList && fileList.length">
        <span>Found {{ imageCount }} images, {{ textCount }} tag files.</span>
        <span>
          <el-button @click="createTabPane" type="warning">Clear</el-button>
          <el-button @click="createTabPane" type="success">Next</el-button>
        </span>
      </section>

      <ImageList>
        <el-image fit="contain" v-for="img in imageList" :key="img.id" :src="img.url">
        </el-image>
      </ImageList>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

import * as TagUtil from '@/utils/tag.js'

import ImageList from '@/components/ImageList/ImageList.vue'

const emit = defineEmits(['create-panel'])

const fileList = ref([])

const loadDataset = async (fileList) => {
  const imageList = []
  const tagList = []

  for (const { raw } of fileList) {
    await new Promise((resolve, reject) => {
      const type = raw.type.split('/')[0]
      // a.b.c.d will get [a, b]
      const [name, ext] = raw.name.split('.')
      const datasetItem = { name, id: raw.uid }
      if (type === 'text') {
        const reader = new FileReader()
        reader.readAsText(raw, 'utf-8')
        reader.onload = (e) => {
          const text = e.target.result

          tagList.push({
            ...datasetItem,
            tags: TagUtil.getTagList(text),
          })

          resolve(void 0)
        }
      } else if (type === 'image') {
        imageList.push({
          ...datasetItem,
          url: URL.createObjectURL(raw),
        })

        resolve(void 0)
      }
    })
  }

  return { imageList, tagList }
}

/**
 * {
 *  text: String
 *  image: String
 *  type: "text" | "image"
 *  url: String
 *  raw: File
 * }
 * 
*/
const imageList = ref([])
const tagList = ref([])

watch(() => fileList.value, async () => {
  const { imageList: i, tagList: t } = await loadDataset(fileList.value)
  imageList.value = i
  tagList.value = t
})

const imageCount = computed(() => imageList.value.length)
const textCount = computed(() => tagList.value.length)

const createTabPane = () => {
  emit('create-panel', {
    imageList: imageList.value,
    tagList: tagList.value,
    id: new Date().getTime()
  })
}
</script>


<style lang="scss" scoped>
.el-main {
  display: flex;
  justify-content: center;

  &>div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    min-width: 768px;
  }

  .upload-container,
  section {
    width: 100%;
  }

  .info {
    display: flex;
    justify-content: space-between;
    line-height: 1.2rem;
    margin: 2rem 0;
  }

  .el-image {
    height: 20vh;
  }
}
</style>