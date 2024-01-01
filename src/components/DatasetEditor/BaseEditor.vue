<template>
  <el-container class="base-editor">
    <el-aside width="250px">
      <div>
        <slot name="left-top"></slot>

        <div class="operation-list">
          <div>
            <el-dropdown>
              <span class="el-dropdown-link">
                Sort By
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="sortBy = 'TagCount'">Tag Count</el-dropdown-item>
                  <el-dropdown-item @click="sortBy = 'Alphabet'">Alphabet</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>{{ sortBy }}</span>
          </div>
        </div>

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

    <div class="right-top">
      <slot name="right-top"></slot>

    </div>
  </el-container>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'

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

const sortBy = ref('TagCount')
const handleTagClick = (tag) => {
  emit('tagClicked')
}
</script>

<style lang="scss" scoped>
.el-container {
  text-align: center;
}

.tag-list {
  display: flex;
  flex-flow: column;

  justify-content: start;
  padding-left: 1rem;

  .el-tag {
    align-self: flex-start;
    margin-bottom: 8px;
    cursor: pointer;
  }
}

.operation-list {
  &>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 0 0.5rem;
    margin-bottom: 1.5rem;
  }


  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}

.right-top {
  position: absolute;
  right: 30px;
  top: 10px;
}
</style>