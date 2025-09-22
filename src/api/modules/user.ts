import api from '../index'

interface UserInfo {
  tokenHead: string
  user: {
    id: number
    createTime: number[]
    updateTime: number[]
    deleted: 0 | 1
    username: string
    password: string
    email: string | null
    phoneNumber: string
    nickname: string | null
    avatar: string | null
    status: 0 | 1
    lastLoginTime: null
    lastLoginIp: null
  }
  token: string
}

export default {
  // 登录
  login: (data: {
    account: string
    password: string
  }) => api.post<UserInfo>('api/auth/login', data),

  // 获取权限
  permission: () => api.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newPassword: string
  }) => api.post('user/password/edit', data, {
    baseURL: '/mock/',
  }),

  // 发送注册验证码
  sendRegisterCode: (phoneNumber: string) => api.post(`api/auth/send-register-code?phoneNumber=${phoneNumber}`),

  // 用户注册
  register: (data: {
    phone: string
    smsCode: string
    username: string
    password: string
    confirmPassword: string
    email: string | null
    nickname: string | null
  }) => api.post('api/auth/register', data),

  // 检查用户名是否已被注册
  checkUsername: (username: string) => api.get('api/auth/check-username', { params: { username } }),

  // 检查手机号是否已被注册
  checkPhone: (phoneNumber: string) => api.get('api/auth/check-phone', { params: { phoneNumber } }),

  // 发送重置密码验证码
  sendResetCode: (phoneNumber: string) => api.post(`api/auth/send-reset-code?phoneNumber=${phoneNumber}`),

  // 重置密码
  resetPassword: (data: {
    phoneNumber: string
    smsCode: string
    newPassword: string
    confirmPassword: string
  }) => api.post('api/auth/reset-password', data),
}
