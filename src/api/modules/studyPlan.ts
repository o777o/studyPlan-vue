import api from '../index'

export interface PlanTime {
  plans: {
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
    startDate: [number, number, number]
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
  }[]
  title: string
}

export interface PlanTask {
  id: number
  createTime: [number, number, number, number, number, number]
  updateTime: [number, number, number, number, number, number]
  createBy: number
  updateBy: number
  deleted: number
  planId: number
  userId: number
  title: string
  description: string
  dueDate: [number, number, number]
  status: number
  priority: number
  estimatedTime: null
  actualTime: null
  isCompleted: number
  completedTime: null
  subject: string
  chapter: string
}

export interface TaskDetail {
  id: number
  chapter: string
  time: string
  title: string
  progress: number
  questions: {
    id: number
    question: string
    options: string | null
    userAnswer: string | null
  }[]
}

export interface Question {
  id: number
  question: string
  options: string | null
  userAnswer: string
}

export default {
  // 获取仪表盘统计数据
  planTimeList: () => {
    const userStore = useUserStore()
    return api.get<PlanTime[]>('api/study-plans/planTimeList', { headers: { 'X-User-Id': userStore.userId } })
  },
  // 根据计划ID获取任务详情
  byPlan: (planId: number) => {
    const userStore = useUserStore()
    return api.get<PlanTask[]>(`api/tasks/by-plan/${planId}`, { headers: { 'X-User-Id': userStore.userId } })
  },
  // 根据时间获取任务详情
  byDate: (date: string) => {
    const userStore = useUserStore()
    return api.get<TaskDetail[]>('api/tasks/by-date', { params: { date }, headers: { 'X-User-Id': userStore.userId } })
  },
  questionAnswer: (data: TaskDetail['questions']) => {
    const userStore = useUserStore()
    return api.post('api/question/answer', {
      data,
      headers: { 'X-User-Id': userStore.userId },
    })
  },
}
