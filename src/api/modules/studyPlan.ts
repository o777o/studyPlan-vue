import api from '../index'

export interface Plan {
  id: number
  createTime: string
  updateTime: string
  createBy: number
  updateBy: number
  deleted: number
  userId: number
  parentId: number
  title: string
  description: string
  workingStatus: string
  startDate: string
  endDate: string
  status: number
  progress: number
  priority: number
  subject: string
  estimatedHours: number
  actualHours: number
  school: string
  major: string
  planType: number
  dailyStudyHours: number
  planPeriod: string
  availableDays: string
  isCompleted: number
  candidateType: number
}

export default {
  // 获取仪表盘统计数据
  planTimeList: () => {
    const userStore = useUserStore()
    return api.get<Plan[]>('api/study-plans/planTimeList', { headers: { 'X-User-Id': userStore.userId } })
  },
}
