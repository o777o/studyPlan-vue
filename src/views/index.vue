<route lang="yaml">
meta:
  title: 首页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import api from '@/api';

// const response = await api.get('dashboard').then((res) => {
//   // 后续业务代码
// });

const versionType = ref('basic')
watch(versionType, (val) => {
  if (val === 'pro') {
    location.href = `${location.origin}${location.pathname}`.replace('basic-example', 'pro-example')
  }
})

const dataCards = ref([
  { id: 1, title: '学习计划', icon: 'book', value: '5', label: '正在进行的学习计划' },
  { id: 2, title: '任务完成率', icon: 'check-circle', value: '78%', label: '本周任务完成率' },
  { id: 3, title: '学习时长', icon: 'clock', value: '32小时', label: '本周累计学习时长' },
  { id: 4, title: '错题记录', icon: 'exclamation-circle', value: '24', label: '本周错题数量' }
]);

const quickLinks = ref([
  { id: 1, icon: 'plus-circle', text: '新建学习计划', path: '/plans/new' },
  { id: 2, icon: 'calendar-check', text: '今日任务', path: '/tasks/today' },
  { id: 3, icon: 'comment-dots', text: '树洞鸭聊天', path: '/chat' },
  { id: 4, icon: 'book', text: '错题本', path: '/mistakes' }
]);

const activities = ref([
  { 
    id: 1, 
    icon: 'check', 
    title: '完成任务：行测模拟题', 
    desc: '公务员考试行测模拟练习，得分85分', 
    time: '10:20' 
  },
  { 
    id: 2, 
    icon: 'book', 
    title: '添加错题', 
    desc: '在"逻辑推理"部分添加了2道错题', 
    time: '09:45' 
  },
  { 
    id: 3, 
    icon: 'comment', 
    title: '与树洞鸭对话', 
    desc: '咨询了关于学习压力的问题', 
    time: '昨天 20:15' 
  },
  { 
    id: 4, 
    icon: 'calendar', 
    title: '调整学习计划', 
    desc: '修改了"公务员考试"计划的时间安排', 
    time: '昨天 18:30' 
  }
]);

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <FaPageHeader>
      <template #title>
        <div class="flex items-center gap-2">
          <h1 >早上好，张同学！</h1>
          <p class="flex items-center gap-2">今天是{{ new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) }}，您有3项待完成任务</p>
        </div>
      </template>
    </FaPageHeader>
    <div class="w-full flex flex-col gap-4 px-4 xl-flex-row">
      <li v-for="card in dataCards" :key="card.id">
        <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
          <template #title>
            <div class="title-info">
              <div>
                <font-awesome-icon :icon="['fas', card.icon]" style="color: #000;" />
              </div>
              <h3 class="card-title">{{ card.title }}</h3>
            </div>
          </template>
          <div class="flex flex-col gap-2">
            <p>{{ card.value }}</p>
            <p>{{ card.label }}</p>
          </div>
        </FaPageMain>
      </li>
    </div>
    <div class="w-full flex flex-col gap-4 px-4 xl-flex-row">
      <li v-for="item in quickLinks" :key="item.id">
        <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
          <template #title>
            <div class="title-info">
              <h3 class="card-title">{{ item.text }}</h3>
              <div>
                <font-awesome-icon :icon="['fas', item.icon]" style="color: #000;" />
              </div>
            </div>
          </template>
        </FaPageMain>
      </li>
    </div>
    <div class="w-full flex flex-col gap-4 px-4 xl-flex-row">
      <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
        <template #title>
          <div >
            <h3 class="card-title">最近操作记录</h3>
            <button class="view-all" @click="">查看全部</button>
          </div>
          <ul>
            <li v-for="item in activities" :key="item.id">
              <div class="activity-icon">
                <font-awesome-icon :icon="['fas', item.icon]" style="color: #000;" />
              </div>
              <div class="activity-content">
                <h4 class="activity-title">{{ item.title }}</h4>
                <p class="activity-desc">{{ item.desc }}</p>
              </div>
              <span class="activity-time">{{ item.time }}</span>
            </li>
          </ul>
        </template>
        </FaPageMain>
    </div>
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
</style>
