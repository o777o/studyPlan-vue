import type { Question } from '../modules/studyPlan'
import api from '../index'

export interface Pagination {
  total: number
  pageNum: number
  pageSize: number
  pages: number
}

export interface WrongQuestion {
  list: Question[]
}

export default {
  // 分页查询错题列表
  getWrongAnswers: (params: {
    pageNum: number
    pageSize: number
    subject: string
  }) => {
    const userStore = useUserStore()
    return api.get<Pagination & WrongQuestion>('api/wrong-answers', { params, headers: { 'X-User-Id': userStore.userId } })
  },
  // 获取科目列表
  getSubjects: () => {
    const userStore = useUserStore()
    return api.get<string[]>('api/wrong-answers/subjects', { headers: { 'X-User-Id': userStore.userId } })
  },
}
