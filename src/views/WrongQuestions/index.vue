<route lang="yaml">
meta:
  title: 错题本
  icon: i-ant-design:book-outlined
</route>

<script setup lang="ts">
import type { Pagination } from '@/api/modules/wrongAnswers'
// import { Delete, Edit, Filter, Plus, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
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

// 题目列表
const questions = ref([])

// 分页
const pagination = reactive<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  pages: 0,
})

// async function getWrongAnswers() {
//   const { data } = await api.getWrongAnswers({
//     pageNum: pagination.pageNum,
//     pageSize: pagination.pageSize,
//     subject: filters.subject,
//   })
//   console.log(data)
//   questions.value = data || []
// }

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
function addQuestion() {
  ElMessage.info('添加题目功能开发中...')
}

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
// watchEffect(getWrongAnswers)
</script>

<template>
  <div class="wrong-questions-page">
    <div class="page-header">
      <div class="header-left">
        <h2>错题本</h2>
        <!-- <span class="question-count">共 {{ filteredQuestions.length }} 道题目</span> -->
      </div>
      <!-- <div class="header-actions">
        <el-button type="primary" :icon="Plus" @click="addQuestion">
          添加题目
        </el-button>
        <el-button :icon="Plus" @click="importQuestions">
          导入
        </el-button>
        <el-button :icon="Plus" @click="exportQuestions">
          导出
        </el-button>
      </div> -->
    </div>

    <!-- 筛选区域 -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-item">
          <el-select v-model="filters.subject" placeholder="选择科目" clearable>
            <el-option
              v-for="option in subjectOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </div>

        <!-- <div class="filter-item">
          <el-select v-model="filters.difficulty" placeholder="选择难度" clearable>
            <el-option
              v-for="option in difficultyOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <el-select v-model="filters.status" placeholder="选择状态" clearable>
            <el-option
              v-for="option in statusOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <el-input
            v-model="filters.keyword"
            placeholder="搜索题目..."
            :prefix-icon="Search"
            clearable
          />
        </div>

        <div class="filter-actions">
          <el-button @click="clearFilters">
            清空筛选
          </el-button>
        </div> -->
      </div>

      <!-- 批量操作 -->
      <!-- <div v-if="selectedQuestions.length > 0" class="batch-actions">
        <span class="batch-info">已选择 {{ selectedQuestions.length }} 道题目</span>
        <el-button type="success" @click="batchMarkAsMastered">
          批量标记为掌握
        </el-button>
        <el-button type="danger" @click="batchDelete">
          批量删除
        </el-button>
      </div> -->
    </div>

    <!-- 题目列表 -->
    <div class="questions-list">
      <!-- <el-card
        v-for="question in questions"
        :key="question.id"
        class="question-card"
        :class="{ expanded: question.isExpanded }"
      >
        <div class="question-header" @click="toggleQuestion(question.id)">
          <div class="question-info">
            <div class="question-title">
              {{ question.title }}
            </div>
            <div class="question-meta">
              <el-tag :type="getSubjectTagType(question.subject)" size="small">
                {{ getSubjectName(question.subject) }}
              </el-tag>
              <el-tag :type="getDifficultyTagType(question.difficulty)" size="small">
                {{ difficultyOptions.find(opt => opt.value === question.difficulty)?.label }}
              </el-tag>
              <el-tag :type="getStatusTagType(question.status)" size="small">
                {{ statusOptions.find(opt => opt.value === question.status)?.label }}
              </el-tag>
              <span class="review-count">复习 {{ question.reviewCount }} 次</span>
            </div>
          </div>
          <div class="question-actions">
            <el-icon class="expand-icon" :class="{ expanded: question.isExpanded }">
              <Eye v-if="!question.isExpanded" />
              <EyeOff v-else />
            </el-icon>
          </div>
        </div>

        <div v-if="question.isExpanded" class="question-detail">
          <div class="question-content">
            <h4>题目内容：</h4>
            <p>{{ question.content }}</p>
          </div>

          <div class="question-answer">
            <h4>正确答案：</h4>
            <p class="answer-text">
              {{ question.answer }}
            </p>
          </div>

          <div class="question-explanation">
            <h4>解析：</h4>
            <p>{{ question.explanation }}</p>
          </div>

          <div class="question-footer">
            <div class="question-stats">
              <span>创建时间：{{ question.createTime }}</span>
              <span>最后复习：{{ question.lastReview }}</span>
            </div>
            <div class="question-buttons">
              <el-button
                v-if="question.status !== 'mastered'"
                type="success"
                size="small"
                @click.stop="markAsMastered(question.id)"
              >
                标记为掌握
              </el-button>
              <el-button
                v-if="question.status === 'mastered'"
                type="warning"
                size="small"
                @click.stop="markAsUnmastered(question.id)"
              >
                标记为未掌握
              </el-button>
              <el-button type="primary" size="small" :icon="Edit">
                编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                :icon="Delete"
                @click.stop="deleteQuestion(question.id)"
              >
                删除
              </el-button>
            </div>
          </div>
        </div>
      </el-card> -->

      <!-- 空状态 -->
      <div v-if="questions.length === 0" class="empty-state">
        <el-empty description="暂无错题记录">
          <el-button type="primary" @click="addQuestion">
            添加第一道错题
          </el-button>
        </el-empty>
      </div>
    </div>

    <el-pagination
      v-model:current-page="pagination.pageNum"
      hide-on-single-page
      :total="pagination.total"
      :page-size="pagination.pageSize"
      layout="prev, pager, next"
    />
  </div>
  <div />
</template>

<style scoped>
.wrong-questions-page {
  height: 100%;
  padding: 20px;
  background: #f5f5f5;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}

.header-left h2 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.question-count {
  font-size: 14px;
  color: #666;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.filter-section {
  padding: 20px;
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.filter-item {
  min-width: 150px;
}

.filter-actions {
  margin-left: auto;
}

.batch-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  margin-top: 16px;
  background: #f0f9ff;
  border: 1px solid #b3d8ff;
  border-radius: 4px;
}

.batch-info {
  font-weight: 500;
  color: #409eff;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question-card {
  cursor: pointer;
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
}

.question-card:hover {
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
}

.question-card.expanded {
  border-color: #409eff;
}

.question-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
}

.question-info {
  flex: 1;
}

.question-title {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #333;
}

.question-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.review-count {
  font-size: 12px;
  color: #666;
}

.question-actions {
  margin-left: 16px;
}

.expand-icon {
  font-size: 18px;
  color: #666;
  transition: transform 0.3s;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.question-detail {
  padding: 0 16px 16px;
  margin-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.question-content,
.question-answer,
.question-explanation {
  margin-bottom: 16px;
}

.question-content h4,
.question-answer h4,
.question-explanation h4 {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.question-content p,
.question-explanation p {
  margin: 0;
  line-height: 1.6;
  color: #666;
}

.answer-text {
  font-weight: 500;
  color: #67c23a !important;
}

.question-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.question-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #999;
}

.question-buttons {
  display: flex;
  gap: 8px;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
}

/* 响应式设计 */
@media (width <= 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .header-actions {
    justify-content: center;
  }

  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-item {
    min-width: auto;
  }

  .filter-actions {
    margin-left: 0;
  }

  .question-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .question-buttons {
    justify-content: center;
  }
}
</style>
