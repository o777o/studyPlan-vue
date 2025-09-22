import api from '../index'

export interface DashboardStats {
  stats: {
    title: string
    icon: string
    description: string
    value: string
    link: string
  }[]
  ongoingPlanCount: number
  weeklyTaskCompletionRate: number
  weeklyWrongAnswerCount: number
  weekStartDate: string
  weekEndDate: string
}

export default {
  // 获取仪表盘统计数据
  dashboardStats: () => {
    const userStore = useUserStore()
    return api.get<DashboardStats>('api/dashboard/stats', { headers: { 'X-User-Id': userStore.userId } })
  },
}
