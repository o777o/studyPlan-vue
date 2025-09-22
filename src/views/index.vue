<route lang="yaml">
meta:
  title: 首页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import type { DashboardStats } from '@/api/modules/dashboard'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import api from '@/api/modules/dashboard'

const versionType = ref('basic')
watch(versionType, (val) => {
  if (val === 'pro') {
    location.href = `${location.origin}${location.pathname}`.replace('basic-example', 'pro-example')
  }
})

const dataCards = ref<DashboardStats['stats']>([])

// const quickLinks = ref([
//   { id: 1, icon: 'plus-circle', text: '新建学习计划', path: '/study-plan' },
//   { id: 2, icon: 'calendar-check', text: '今日任务', path: '/study-plan' },
//   { id: 3, icon: 'comment-dots', text: '树洞鸭聊天', path: '/chat' },
//   { id: 4, icon: 'book', text: '错题本', path: '/wrong-questions' },
// ])

// const activities = ref([
//   {
//     id: 1,
//     icon: 'check',
//     title: '完成任务：行测模拟题',
//     desc: '公务员考试行测模拟练习，得分85分',
//     time: '10:20',
//   },
//   {
//     id: 2,
//     icon: 'book',
//     title: '添加错题',
//     desc: '在"逻辑推理"部分添加了2道错题',
//     time: '09:45',
//   },
//   {
//     id: 3,
//     icon: 'comment',
//     title: '与树洞鸭对话',
//     desc: '咨询了关于学习压力的问题',
//     time: '昨天 20:15',
//   },
//   {
//     id: 4,
//     icon: 'calendar',
//     title: '调整学习计划',
//     desc: '修改了"公务员考试"计划的时间安排',
//     time: '昨天 18:30',
//   },
// ])

// function open(url: string) {
//   window.open(url, '_blank')
// }

// 跳转到指定页面
function navigateTo(path: string) {
  const router = useRouter()
  router.push(path)
}

const { data: { stats } } = await api.dashboardStats()
dataCards.value = stats || []
</script>

<template>
  <div class="p-6">
    <!-- <FaPageHeader>
      <template #title>
        <div class="flex items-center gap-2">
          <h1 >早上好，张同学！</h1>
          <p class="flex items-center gap-2">今天是{{ new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) }}，您有3项待完成任务</p>
        </div>
      </template>
    </FaPageHeader> -->
    <!-- <div class="w-full flex flex-col gap-4 px-4 xl-flex-row">
      <li v-for="card in dataCards" :key="card.id">
        <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
          <template #title>
            <div class="title-info">
              <div>
                <font-awesome-icon :icon="['fas', card.icon]" style="color: #000;" />
              </div>
              <h3 class="card-title">
                {{ card.title }}
              </h3>
            </div>
          </template>
          <div class="flex flex-col gap-2">
            <p>{{ card.value }}</p>
            <p>{{ card.label }}</p>
          </div>
        </FaPageMain>
      </li>
    </div> -->
    <div>
      <div class="dashboard-container">
        <div v-for="card in dataCards" :key="card.title" class="card data-card">
          <div class="card-header">
            <div class="card-title">
              {{ card.title }}
            </div>
            <!-- <div class="card-icon">
              <font-awesome-icon :icon="['fas', card.icon]" style="color: #000;" />
            </div> -->
          </div>
          <div class="card-value">
            {{ card.value }}
          </div>
          <div class="card-label">
            {{ card.description }}
          </div>
        </div>
      </div>

      <!-- 快捷入口 -->
      <div class="quick-links">
        <div class="quick-link">
          <FontAwesomeIcon :icon="['fas', 'fa-plus-circle']" size="xl" />
          <span>新建学习计划</span>
        </div>
        <div class="quick-link" @click="navigateTo('/study-plan')">
          <FontAwesomeIcon :icon="['fas', 'fa-calendar-check']" size="xl" />
          <span>今日任务</span>
        </div>
        <div class="quick-link" @click="navigateTo('/study-plan')">
          <FontAwesomeIcon :icon="['fas', 'fa-comment-dots']" size="xl" />
          <span>树洞鸭聊天</span>
        </div>
        <div class="quick-link" @click="navigateTo('/study-plan')">
          <FontAwesomeIcon :icon="['fas', 'fa-book']" size="xl" />
          <span>错题本</span>
        </div>
      </div>

      <!-- 最近操作记录 -->
      <!-- <div class="card">
        <div class="card-header">
          <div class="card-title">
            最近操作记录
          </div>
        </div>
        <ul class="activity-list">
          <li class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-check" />
            </div>
            <div class="activity-content">
              <div class="activity-title">
                完成任务：行测模拟题
              </div>
              <div class="activity-desc">
                公务员考试行测模拟练习，得分85分
              </div>
            </div>
            <div class="activity-time">
              10:20
            </div>
          </li>
          <li class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-book" />
            </div>
            <div class="activity-content">
              <div class="activity-title">
                添加错题
              </div>
              <div class="activity-desc">
                在"逻辑推理"部分添加了2道错题
              </div>
            </div>
            <div class="activity-time">
              09:45
            </div>
          </li>
          <li class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-comment" />
            </div>
            <div class="activity-content">
              <div class="activity-title">
                与树洞鸭对话
              </div>
              <div class="activity-desc">
                咨询了关于学习压力的问题
              </div>
            </div>
            <div class="activity-time">
              昨天 20:15
            </div>
          </li>
          <li class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-calendar" />
            </div>
            <div class="activity-content">
              <div class="activity-title">
                调整学习计划
              </div>
              <div class="activity-desc">
                修改了"公务员考试"计划的时间安排
              </div>
            </div>
            <div class="activity-time">
              昨天 18:30
            </div>
          </li>
        </ul>
      </div> -->
    </div>
    <!-- <div class="w-full flex flex-col gap-4 px-4 xl-flex-row">
      <div v-for="item in quickLinks" :key="item.id" class="quick-link-card">
        <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
          <template #title>
            <div class="title-info" @click="navigateTo(item.path)">
              <h3 class="card-title">
                {{ item.text }}
              </h3>
              <div>
                <font-awesome-icon :icon="['fas', item.icon]" style="color: #000;" />
              </div>
            </div>
          </template>
        </FaPageMain>
      </div>
    </div>
    <div class="w-full flex flex-col gap-4 px-4 xl-flex-row">
      <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
        <template #title>
          <div>
            <h3 class="card-title">
              最近操作记录
            </h3>
            <button class="view-all" @click="">
              查看全部
            </button>
          </div>
          <ul>
            <li v-for="item in activities" :key="item.id">
              <div class="activity-icon">
                <font-awesome-icon :icon="['fas', item.icon]" style="color: #000;" />
              </div>
              <div class="activity-content">
                <h4 class="activity-title">
                  {{ item.title }}
                </h4>
                <p class="activity-desc">
                  {{ item.desc }}
                </p>
              </div>
              <span class="activity-time">{{ item.time }}</span>
            </li>
          </ul>
        </template>
      </FaPageMain>
    </div> -->
  </div>
</template>

<style scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.title-info {
  --uno: flex items-center gap-4;

  img {
    --uno: block w-12 h-12;
  }

  h1 {
    --uno: m-0 text-2xl;
  }

  h2 {
    --uno: m-0 text-base text-secondary-foreground/50 font-normal;
  }
}

.quick-link-card {
  cursor: pointer;
  transition: all 0.3s;
}

.quick-link-card:hover {
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  transform: translateY(-2px);
}

.quick-link-card .title-info {
  padding: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.quick-link-card .title-info:hover {
  background-color: #f0f9ff;
}

/* 首页概览样式 */
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.card {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 18px;
  color: var(--text-primary);
  background-color: var(--primary-color);
  border-radius: 8px;
}

/* 数据卡片 */
.data-card .card-value {
  margin-bottom: 8px;
  font-size: 32px;
  font-weight: 700;
}

.data-card .card-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  background-color: hsl(54deg 100% 88%);
  border-radius: 8px;
  transition: all 0.2s;
}

.quick-link:hover {
  background-color: var(--primary-dark);
}

.quick-link span {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
</style>
