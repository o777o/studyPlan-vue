<route lang="yaml">
meta:
  title: 学习计划
  icon: i-ant-design:book-outlined
</route>

<script setup lang="ts">
import type { PlanTask, PlanTime, Question, TaskDetail } from '@/api/modules/studyPlan'
import { Calendar, Plus } from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'
import { ref } from 'vue'
import api from '@/api/modules/studyPlan'
import AddPlanDialog from './components/AddPlanDialog/index.vue'
import QuestionModal from './components/QuestionModal/index.vue'

// 计划树数据
const planTree = ref<PlanTime[]>([])
// 当前默认展开的节点
const currentNodeKey = ref(0)

// 当前月份任务列表
const tasks = ref<PlanTask[]>([])
// 当前天任务列表
const todayTasks = ref<TaskDetail[]>([])

// 选择计划
function selectPlan(data: PlanTime | PlanTime['plans'][number]) {
  if (!Object.prototype.hasOwnProperty.call(data, 'id')) {
    return void 0
  }
  getPlan((data as PlanTime['plans'][number]))
}

// 当前月份
const value = ref(new Date())

// 获取时间导航列表
async function getPlanTimeList() {
  planTree.value = []
  const res = await api.planTimeList()
  planTree.value = res.data || []
  for (const planTime of planTree.value) {
    for (const plan of planTime.plans) {
      const currentMonth = plan.startDate[1]
      if (currentMonth === value.value.getMonth() + 1) {
        currentNodeKey.value = plan.id
        getPlan(plan)
      }
    }
  }
}

// 根据计划ID获取任务详情
async function getPlan(plan: PlanTime['plans'][number]) {
  value.value = new Date(plan.startDate.join(','))
  const [{ data }] = await Promise.all([api.byPlan(plan.id), getTasksbyDate()])
  tasks.value = data || []
}

watch(value, (newVal, oldVal) => {
  getTasksbyDate()
  if (newVal.getMonth() !== oldVal.getMonth()) {
    for (const planTime of planTree.value) {
      for (const plan of planTime.plans) {
        const currentMonth = plan.startDate[1]
        if (currentMonth === newVal.getMonth() + 1) {
          currentNodeKey.value = plan.id
          getPlan(plan)
        }
      }
    }
  }
})

// 根据时间获取任务详情
async function getTasksbyDate() {
  const { data } = await api.byDate(dayjs(value.value).format('YYYY-MM-DD'))
  todayTasks.value = data || []
}

// 添加计划弹窗
const addPlanDialogVisible = ref(false)

// 答题弹窗
const questionDialogVisible = ref(false)
const chapter = ref('')
const progress = ref(0)
const questions = ref<Question[]>([])

// 切换月份
// function changeMonth(direction: 'prev' | 'next') {
//   if (direction === 'prev') {
//     currentMonthIndex.value--
//     if (currentMonthIndex.value < 0) {
//       currentMonthIndex.value = 11
//       currentYear.value--
//     }
//   }
//   else {
//     currentMonthIndex.value++
//     if (currentMonthIndex.value > 11) {
//       currentMonthIndex.value = 0
//       currentYear.value++
//     }
//   }
//   generateCalendar()
// }

// // 回到今天
// function goToToday() {
//   const today = new Date()
//   currentYear.value = today.getFullYear()
//   currentMonthIndex.value = today.getMonth()
//   generateCalendar()
// }

// 打开添加计划弹窗
function openAddPlanDialog() {
  addPlanDialogVisible.value = true
}

// 提交计划
// function submitPlan() {
//   ElMessage.success('学习计划已提交！')
//   addPlanDialogVisible.value = false
//   // 重置表单
//   Object.assign(planForm, {
//     type: '',
//     targetCity: '',
//     targetPosition: '',
//     examDate: '',
//     candidateType: '',
//     currentProgress: '',
//   })
// }

// 完成任务
function completeTask(task: TaskDetail) {
  questions.value = task.questions.map(v => ({ ...v, userAnswer: v.userAnswer || '' }))
  chapter.value = task.chapter
  progress.value = task.progress
  questionDialogVisible.value = true
}

// 选择答案
// function selectAnswer(questionId: number, answerId: string) {
//   selectedAnswers.value[questionId] = answerId
// }

api.existsPlan().then(({ data }) => {
  if (!data) {
    addPlanDialogVisible.value = true
  }
})

getPlanTimeList()
</script>

<template>
  <div class="study-plan-container">
    <div class="plan-layout">
      <!-- 左侧计划树 -->
      <div class="plan-left">
        <div class="section-header">
          <h3>{{ dayjs(value).format('YYYY年M月D日') }}任务</h3>
        </div>

        <el-button class="my-4 w-full" type="primary" :icon="Plus" @click="openAddPlanDialog">
          添加学习计划
        </el-button>

        <el-tree
          class="plan-tree"
          node-key="id"
          :data="planTree"
          :props="{ children: 'plans' }"
          :default-expanded-keys="[currentNodeKey]"
          @node-click="selectPlan"
        >
          <template #default="{ data }: { data: PlanTime | PlanTime['plans'][number] }">
            <div class="tree-node">
              <el-icon color="#333">
                <Calendar />
              </el-icon>
              <span>
                {{
                  Object.prototype.hasOwnProperty.call(data, 'id')
                    ? `${(data as PlanTime['plans'][number]).startDate[1]}月计划`
                    : data.title
                }}
              </span>
            </div>
          </template>
        </el-tree>
      </div>

      <!-- 中间日历区域 -->
      <div class="plan-center">
        <el-calendar v-model="value">
          <template #date-cell="{ data: { date, day } }: { data: { date: Date, day: string } }">
            <div>{{ date.getDate() }}</div>
            <el-tag v-for="task in tasks.filter(v => dayjs(new Date(v.dueDate.join(','))).format('YYYY-MM-DD') === day).slice(0, 2)" :key="task.id" type="info" class="task-tag w-full bg-[#e3f2fd]">
              {{ task.chapter }}
            </el-tag>
          </template>
        </el-calendar>
      </div>

      <!-- 右侧任务列表 -->
      <div class="plan-right">
        <div class="section-header">
          <h3>{{ dayjs(value).format('YYYY年M月D日') }}任务</h3>
          <!-- <el-button type="primary" size="small" :icon="Plus">
            添加任务
          </el-button> -->
        </div>

        <div class="task-list">
          <el-card
            v-for="task in todayTasks"
            :key="task.id"
            class="task-card"
          >
            <div class="task-header">
              <h4>{{ task.chapter }}</h4>
              <span class="task-time">{{ task.time }}</span>
            </div>
            <p class="task-content">
              {{ task.title }}
            </p>
            <div class="task-progress">
              <el-progress :percentage="task.progress" :show-text="false" />
            </div>
            <div class="task-actions">
              <el-button type="primary" @click="completeTask(task)">
                完成任务
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <QuestionModal
      v-model="questions"
      v-model:show="questionDialogVisible"
      :chapter="chapter"
      :progress="progress"
      @submit-answers="getTasksbyDate"
    />

    <AddPlanDialog v-model="addPlanDialogVisible" @add-study-plan="getPlanTimeList" />
  </div>
</template>

<style scoped>
.study-plan-container {
  height: 100%;
  padding: 20px;
}

.plan-layout {
  display: flex;
  gap: 20px;
  height: 100%;
}

.plan-left,
.plan-center,
.plan-right {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.plan-left {
  width: 250px;
  overflow-y: auto;
}

.plan-center {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.plan-right {
  width: 300px;
  overflow-y: auto;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.section-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.tree-node {
  display: flex;
  gap: 8px;
  align-items: center;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.calendar-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.calendar-nav {
  display: flex;
  gap: 10px;
}

.calendar-grid {
  display: grid;
  flex: 1;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day-header {
  padding: 10px;
  font-weight: 500;
  color: #666;
  text-align: center;
  background: #f5f5f5;
  border-radius: 4px;
}

.calendar-day {
  min-height: 100px;
  padding: 8px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: all 0.2s;
}

.calendar-day:hover {
  background: #f0f9ff;
}

.calendar-day.empty {
  cursor: default;
  background: #f9f9f9;
  border: none;
}

.calendar-day.today {
  background: #e6f7ff;
  border-color: #409eff;
}

.calendar-day.has-tasks {
  border-color: #67c23a;
}

.day-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.day-number {
  margin-bottom: 4px;
  font-weight: 500;
}

.task-indicator {
  margin-top: auto;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-card {
  border-left: 4px solid hsl(var(--primary));
}

.task-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.task-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.task-time {
  font-size: 12px;
  color: #666;
}

.task-content {
  margin-bottom: 12px;
  line-height: 1.5;
  color: #666;
}

.task-progress {
  margin-bottom: 12px;
}

.progress-text {
  font-size: 12px;
  color: #666;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
}

@media (width <= 1200px) {
  .plan-layout {
    flex-direction: column;
  }

  .plan-left,
  .plan-center,
  .plan-right {
    width: 100%;
  }

  .plan-center {
    min-height: 500px;
  }
}

.plan-tree {
  --el-tree-node-hover-bg-color: hsl(var(--primary));
  --el-tree-node-content-height: 44px;
}

.task-tag :deep(.el-tag__content) {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
