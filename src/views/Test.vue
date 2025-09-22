<route lang="yaml">
meta:
  title: 测试页面
  icon: i-ant-design:experiment-outlined
</route>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello Vue 3 + Element Plus!')
</script>

<template>
  <div class="test-page">
    <h1>{{ message }}</h1>
    <el-button type="primary">
      测试按钮
    </el-button>
    <el-card>
      <h3>测试卡片</h3>
      <p>这是一个测试页面，用于验证Element Plus组件是否正常工作。</p>
    </el-card>
  </div>
</template>

<style scoped>
.test-page {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #409eff;
}
</style>
