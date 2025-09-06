<route lang="yaml">
  meta:
    title: 仪表盘
    icon: i-heroicons-solid:chart-bar
  </route>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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

const navigateTo = (path) => {
  router.push(path);
};

// 模拟API调用
const fetchDashboardData = async () => {
  try {
    // 这里可以添加实际的API调用
    // const response = await api.get('/dashboard');
    // dataCards.value = response.data.cards;
    // activities.value = response.data.activities;
  } catch (error) {
    console.error('获取仪表盘数据失败:', error);
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>

<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <h1>早上好，张同学！</h1>
      <p>今天是{{ new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) }}，您有3项待完成任务</p>
    </div>
    
    <div class="card-grid">
      <div v-for="card in dataCards" :key="card.id" class="card">
        <div class="card-header">
          <h3 class="card-title">{{ card.title }}</h3>
          <div class="card-icon">
            <font-awesome-icon :icon="['fas', card.icon]" style="color: #000;" />
          </div>
        </div>
        <div class="card-content">
          <div class="card-value">{{ card.value }}</div>
          <div class="card-label">{{ card.label }}</div>
        </div>
      </div>
    </div>
    
    <div class="card quick-actions">
      <h3 class="card-title">快捷入口</h3>
      <div class="quick-links">
        <div 
          v-for="link in quickLinks" 
          :key="link.id" 
          class="quick-link"
          @click="navigateTo(link.path)"
        >
          <div class="quick-link-icon">
            <font-awesome-icon :icon="['fas', link.icon]" style="color: #000;" />
          </div>
          <span class="quick-link-text">{{ link.text }}</span>
        </div>
      </div>
    </div>
    
    <div class="card recent-activities">
      <div class="card-header">
        <h3 class="card-title">最近操作记录</h3>
        <button class="view-all" @click="navigateTo('/activities')">查看全部</button>
      </div>
      <ul class="activity-list">
        <li v-for="activity in activities" :key="activity.id" class="activity-item">
          <div class="activity-icon">
            <font-awesome-icon :icon="['fas', activity.icon]" style="color: #000;" />
          </div>
          <div class="activity-content">
            <h4 class="activity-title">{{ activity.title }}</h4>
            <p class="activity-desc">{{ activity.desc }}</p>
          </div>
          <span class="activity-time">{{ activity.time }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-section {
  margin-bottom: 32px;
}

.welcome-section h1 {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.welcome-section p {
  color: var(--text-secondary);
  font-size: 16px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  padding: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-dark);
  font-size: 20px;
}

.card-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.2;
}

.card-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.quick-actions {
  margin-bottom: 24px;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.quick-link {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--primary-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.quick-link:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.quick-link-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: var(--primary-dark);
  font-size: 16px;
}

.quick-link-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
}

.recent-activities .card-header {
  margin-bottom: 0;
}

.view-all {
  background: none;
  border: none;
  color: var(--primary-dark);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.view-all:hover {
  background-color: var(--primary-color);
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 16px;
}

.activity-item {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  align-items: flex-start;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  color: var(--primary-dark);
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-time {
  font-size: 12px;
  color: var(--text-secondary);
  margin-left: 16px;
  white-space: nowrap;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .quick-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }
  
  .card-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .quick-links {
    grid-template-columns: 1fr;
  }
  
  .activity-item {
    flex-direction: column;
    gap: 8px;
  }
  
  .activity-time {
    margin-left: 52px; /* 36px (icon) + 16px (margin) */
  }
}

@media (max-width: 480px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-section h1 {
    font-size: 24px;
  }
  
  .card-value {
    font-size: 28px;
  }
}
</style>
