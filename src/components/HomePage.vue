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
        <el-button @click="createTabPane">Next</el-button>
      </section>

      <ImageList>
        <el-image fit="contain" v-for="value in dataset" :key="value.id" :src="value.url"> {{ value.url }}</el-image>
      </ImageList>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { watch } from 'vue';

import ImageList from '@/components/ImageList/ImageList.vue'

const emit = defineEmits(['create-panel'])

const fileList = ref([])

const loadDataset = (fileList) => {
  const dataset = {}
  for (const { raw } of fileList) {
    const [filename, ext] = raw.name.split('.')
    dataset[filename] = dataset[filename] || { text: null, image: null, type: "", raw: null }
    const type = raw.type.split('/')[0]
    if (['image', 'text'].indexOf(type) > -1) {
      dataset[filename][type] = raw
      dataset[filename].type = type
      if (type === 'image') {
        dataset[filename].url = URL.createObjectURL(raw)
      } else {
        const reader = new FileReader();
        reader.onload = function (evt) {
          dataset[filename].text = evt.target.result
        };
        
        reader.readAsText(raw);
      }
    }
  }

  return dataset
}

const dataset = ref({})
const filenameList = computed(() => Object.keys(dataset.value))

watch(() => fileList.value, () => {
  dataset.value = loadDataset(fileList.value)
})

const imageCount = computed(() => filenameList.value.filter(name => dataset.value[name]?.image).length)
const textCount = computed(() => filenameList.value.filter(name => dataset.value[name]?.text).length)

const createTabPane = () => {
  emit('create-panel', dataset.value)
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
    height: 150px;
  }
}
</style>