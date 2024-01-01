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
    <el-tab-pane v-for="pane in paneList" :name="`DatasetEditor_${pane.id}`" :label="`DatasetEditor_${pane.id}`"
      :key="pane.id">
      <DatasetEditor :data="pane"></DatasetEditor>
    </el-tab-pane>
  </el-tabs>

  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped lang="scss">
.el-tabs {
  height: 100%;
}

:deep(.el-tabs__content) {
  height: calc(100vh - 60px);

  &>div {
    height: 100%;
    overflow: auto;
  }
}
</style>
