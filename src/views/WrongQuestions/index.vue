<route lang="yaml">
meta:
  title: 错题本
  icon: i-ant-design:book-outlined
</route>

<script setup lang="ts">
import type { Question } from '@/api/modules/studyPlan'
import type { Pagination } from '@/api/modules/wrongAnswers'
// import { Delete, Edit, Filter, Plus, Search } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import api from '@/api/modules/wrongAnswers'

// 筛选条件
const filters = reactive({
  subject: '',
  difficulty: '',
  status: '',
  keyword: '',
})

// 科目选项
const subjectOptions = ref<string[]>([])

interface QuestionPage extends Question {
  isExpanded: boolean
}
// 题目列表
const questions = ref<QuestionPage[]>([])

// 分页
const pagination = reactive<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  pages: 0,
})

async function getWrongAnswers() {
  const { data: { list, total } } = await api.getWrongAnswers({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    subject: filters.subject,
  })
  questions.value = (list || []).map(v => ({ ...v, isExpanded: false }))
  pagination.total = total
}

async function getSubjects() {
  const { data } = await api.getSubjects()
  subjectOptions.value = data || []
}

// // 难度选项
// const difficultyOptions = [
//   { label: '所有难度', value: 'all' },
//   { label: '简单', value: 'easy' },
//   { label: '中等', value: 'medium' },
//   { label: '困难', value: 'hard' },
// ]

// // 状态选项
// const statusOptions = [
//   { label: '所有状态', value: 'all' },
//   { label: '未掌握', value: 'unmastered' },
//   { label: '已掌握', value: 'mastered' },
//   { label: '需复习', value: 'review' },
// ]

// // 获取状态标签类型
// function getStatusTagType(status: string) {
//   switch (status) {
//     case 'mastered':
//       return 'success'
//     case 'unmastered':
//       return 'danger'
//     case 'review':
//       return 'warning'
//     default:
//       return 'info'
//   }
// }

// // 获取难度标签类型
// function getDifficultyTagType(difficulty: string) {
//   switch (difficulty) {
//     case 'easy':
//       return 'success'
//     case 'medium':
//       return 'warning'
//     case 'hard':
//       return 'danger'
//     default:
//       return 'info'
//   }
// }

// // 获取科目标签类型
// function getSubjectTagType(subject: string) {
//   switch (subject) {
//     case 'math':
//       return 'primary'
//     case 'english':
//       return 'success'
//     case 'logic':
//       return 'warning'
//     case 'history':
//       return 'info'
//     case 'computer':
//       return 'danger'
//     default:
//       return 'info'
//   }
// }

// // 切换题目展开状态
// function toggleQuestion(questionId: number) {
//   const question = questions.value.find(q => q.id === questionId)
//   if (question) {
//     question.isExpanded = !question.isExpanded
//   }
// }

// // 标记为已掌握
// function markAsMastered(questionId: number) {
//   const question = questions.value.find(q => q.id === questionId)
//   if (question) {
//     question.status = 'mastered'
//     ElMessage.success('已标记为掌握')
//   }
// }

// // 标记为未掌握
// function markAsUnmastered(questionId: number) {
//   const question = questions.value.find(q => q.id === questionId)
//   if (question) {
//     question.status = 'unmastered'
//     ElMessage.success('已标记为未掌握')
//   }
// }

// // 删除题目
// function deleteQuestion(questionId: number) {
//   ElMessageBox.confirm('确定要删除这道题目吗？', '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//   }).then(() => {
//     const index = questions.value.findIndex(q => q.id === questionId)
//     if (index > -1) {
//       questions.value.splice(index, 1)
//       ElMessage.success('题目已删除')
//     }
//   })
// }

// 添加题目
// function addQuestion() {
//   ElMessage.info('添加题目功能开发中...')
// }

// 批量操作
// const selectedQuestions = ref([])

// // 批量标记为已掌握
// function batchMarkAsMastered() {
//   if (selectedQuestions.value.length === 0) {
//     ElMessage.warning('请选择要操作的题目')
//     return
//   }

//   selectedQuestions.value.forEach((id) => {
//     const question = questions.value.find(q => q.id === id)
//     if (question) {
//       question.status = 'mastered'
//     }
//   })

//   ElMessage.success(`已标记 ${selectedQuestions.value.length} 道题目为掌握`)
//   selectedQuestions.value = []
// }

// 批量删除
// function batchDelete() {
//   if (selectedQuestions.value.length === 0) {
//     ElMessage.warning('请选择要操作的题目')
//     return
//   }

//   ElMessageBox.confirm(`确定要删除选中的 ${selectedQuestions.value.length} 道题目吗？`, '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//   }).then(() => {
//     selectedQuestions.value.forEach((id) => {
//       const index = questions.value.findIndex(q => q.id === id)
//       if (index > -1) {
//         questions.value.splice(index, 1)
//       }
//     })

//     ElMessage.success(`已删除 ${selectedQuestions.value.length} 道题目`)
//     selectedQuestions.value = []
//   })
// }

// 清空筛选
// function clearFilters() {
//   filters.subject = 'all'
//   filters.difficulty = 'all'
//   filters.status = 'all'
//   filters.keyword = ''
// }

// 导出错题
// function exportQuestions() {
//   ElMessage.info('导出功能开发中...')
// }

// 导入错题
// function importQuestions() {
//   ElMessage.info('导入功能开发中...')
// }

getSubjects()
watchEffect(getWrongAnswers)
</script>

<template>
  <div class="p-5">
    <div class="wrong-questions-container">
      <div class="section-title">
        错题本
      </div>
      <div class="question-filter">
        <el-select v-model="filters.subject" clearable>
          <el-option v-for="item in subjectOptions" :key="item" :value="item" :label="item" />
        </el-select>
      </div>
      <div class="question-list">
        <div
          v-for="(question, index) in questions"
          :key="question.id"
          class="question-item"
          @click="question.isExpanded = !question.isExpanded"
        >
          <div class="question-title">
            {{ index + 1 }}. {{ question.question }}
          </div>
          <div class="question-content">
            {{ question.options?.replace(/;/g, ' ') }}
          </div>
          <div v-show="question.isExpanded" class="question-answer">
            <strong>正确答案：</strong> {{ question.correctAnswer }}<br>
            <!-- <strong>解析：</strong> {{ question.analysis }} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 错题本页面样式 */
.wrong-questions-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
}

.question-list {
  flex: 1;
  margin-bottom: 16px;
  overflow-y: auto;
}

.question-item {
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s;
}

.question-item:hover {
  background-color: hsl(var(--primary));
}

.question-title {
  margin-bottom: 8px;
  font-weight: 500;
}

.question-content {
  margin-bottom: 12px;
  color: var(--text-secondary);
}

.question-answer {
  padding: 12px;
  margin-top: 8px;
  background-color: #e8f5e9;
  border-radius: 4px;
}

.question-item.expanded .question-answer {
  display: block;
}

.question-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.filter-select {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}
</style>
