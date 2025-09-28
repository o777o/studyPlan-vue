<script setup lang="ts">
import type { Question } from '@/api/modules/studyPlan'
import { toast } from 'vue-sonner'
import api from '@/api/modules/studyPlan'

defineProps<{ chapter: string, progress: number }>()
const emit = defineEmits<{
  submitAnswers: []
}>()
const questions = defineModel<Question[]>({ default: [] })
const questionDialogVisible = defineModel<boolean>('show')
async function submitAnswers() {
  const questionsDTO = questions.value.map(v => ({
    id: v.id,
    planId: v.planId,
    taskId: v.taskId,
    question: v.question,
    options: v.options,
    userAnswer: v.userAnswer,
    correctAnswer: v.correctAnswer,
    analysis: v.analysis,
  }))
  if (questionsDTO.some(v => !v.userAnswer)) {
    return toast.error('请完成所有题目')
  }
  await api.questionAnswer(questionsDTO)
  toast.success('答案已提交！任务完成')
  emit('submitAnswers')
  questionDialogVisible.value = false
}
</script>

<template>
  <!-- 答题弹窗 -->
  <el-dialog v-model="questionDialogVisible" :title="`完成任务：${chapter}`" header-class="question-dialog font-bold">
    <div class="question-container">
      <div
        v-for="(question, index) in questions"
        :key="question.id"
        class="mb-5"
      >
        <h4 class="mb-4 text-lg">
          {{ index + 1 }}. {{ question.question }}
        </h4>
        <el-radio-group v-model="question.userAnswer" class="question-group w-full">
          <el-radio-button
            v-for="option in question.options?.split(';')"
            :key="option"
            :value="option[0]"
            class="mb-2 w-full"
            :class="{
              correct: progress && option[0] === question.correctAnswer,
              wrong: progress && option[0] === question.userAnswer && question.userAnswer !== question.correctAnswer,
            }"
          >
            {{ option }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <template #footer>
      <el-button type="primary" @click="submitAnswers">
        提交答案
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
/* 答题弹窗 */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  visibility: hidden;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 50%);
  opacity: 0;
  transition: all 0.3s;
}

.modal-overlay.active {
  visibility: visible;
  opacity: 1;
}

.modal-content {
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 20%);
  transform: translateY(-20px);
  transition: transform 0.3s;
}

.modal-overlay.active .modal-content {
  transform: translateY(0);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
}

.close-btn {
  font-size: 24px;
  color: var(--text-secondary);
  cursor: pointer;
  background: none;
  border: none;
}

.modal-body {
  padding: 20px;
}

.question-container {
  margin-bottom: 20px;
}

.question-title {
  margin-bottom: 16px;
  font-size: 18px;
}

.options-list {
  list-style: none;
}

.option-item {
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: all 0.2s;
}

.option-item:hover {
  background-color: var(--primary-color);
}

.option-item.selected {
  background-color: var(--primary-color);
  border-color: var(--primary-dark);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid var(--border-color);
}

.submit-btn {
  padding: 10px 24px;
  font-size: 16px;
  cursor: pointer;
  background-color: var(--primary-dark);
  border: none;
  border-radius: 4px;
  transition: all 0.2s;
}

.submit-btn:hover {
  background-color: #fbc02d;
}

.question-group :deep(.el-radio-button__inner) {
  width: 100%;
  padding: 16px;
  text-align: left;
  border: var(--el-border);
}

.question-container :deep(.el-radio-button__inner:hover) {
  color: var(--el-text-color-regular);
  background-color: hsl(var(--primary));
}

.question-container .correct :deep(.el-radio-button__inner) {
  background-color: var(--el-color-success) !important;
}

.question-container .wrong :deep(.el-radio-button__inner) {
  background-color: var(--el-color-danger) !important;
}

:deep(.question-dialog .el-dialog__title) {
  font-size: 20px;
}
</style>
