import type { Route } from '#/global'
import type { RouteRecordRaw } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:meta-layouts'
import MultilevelMenuExample from './modules/multilevel.menu.example'

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: () => useSettingsStore().settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue'),
        meta: {
          title: () => useSettingsStore().settings.home.title,
          icon: 'i-ant-design:home-twotone',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  // {
  //   meta: {
  //     title: '学习管理',
  //     icon: 'i-ant-design:book-outlined',
  //   },
  //   children: [
  //     {
  //       path: '/study-plan',
  //       name: 'StudyPlan',
  //       component: () => import('@/views/StudyPlan.vue'),
  //       meta: {
  //         title: '学习计划',
  //         icon: 'i-ant-design:calendar-outlined',
  //       },
  //     },
  //     {
  //       path: '/chat',
  //       name: 'Chat',
  //       component: () => import('@/views/Chat.vue'),
  //       meta: {
  //         title: '树洞鸭聊天',
  //         icon: 'i-ant-design:message-outlined',
  //       },
  //     },
  //     {
  //       path: '/wrong-questions',
  //       name: 'WrongQuestions',
  //       component: () => import('@/views/WrongQuestions.vue'),
  //       meta: {
  //         title: '错题本',
  //         icon: 'i-ant-design:book-outlined',
  //       },
  //     },
  //   ],
  // },
  {
    meta: {
      title: '仪表盘',
      icon: 'i-uim:box',
    },
    children: [
      MultilevelMenuExample,
    ],
  },
]

const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true
})

const asyncRoutesByFilesystem = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
}))

export {
  asyncRoutes,
  asyncRoutesByFilesystem,
  constantRoutes,
  constantRoutesByFilesystem,
  systemRoutes,
}
