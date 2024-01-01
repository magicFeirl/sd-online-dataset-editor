<script setup>
import HomePage from '@/components/HomePage.vue'
import DatasetEditor from '@/components/DatasetEditor/DatasetEditor.vue'

const activePane = ref("HomePage")
const paneList = ref([])

const handleCreatePanel = (panelData) => {
  paneList.value.push(panelData)
}
</script>

<template>
  <el-tabs v-model="activePane" type="card">
    <el-tab-pane name="HomePage" label="HomePage">
      <HomePage @create-panel="handleCreatePanel"></HomePage>
    </el-tab-pane>
    <el-tab-pane name="DatasetEditor" label="DatasetEditor">
      <DatasetEditor></DatasetEditor>
    </el-tab-pane>
    <el-tab-pane v-for="pane in paneList" label="newLabel" :name="pane.name"></el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.el-tabs {
  height: 100%;
}

:deep(.el-tabs__content) {
  height: calc(100vh - 60px);

  & > div {
    height: 100%;
    overflow: auto;
  }
}
</style>
