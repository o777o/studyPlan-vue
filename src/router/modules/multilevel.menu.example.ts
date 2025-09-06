import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/multilevel_menu_example',
  component: Layout,
  name: 'multilevelMenuExample',
  meta: {
    title: '多级导航',
    icon: 'i-heroicons-solid:menu-alt-3',
    alwaysOpened: true,
  },
  children: [
    {
      path: 'page',
      name: 'multilevelMenuExample1',
      component: () => import('@/views/index.vue'),
      meta: {
        title: '仪表盘',
      },
    },
    {
      path: 'level2',
      name: 'multilevelMenuExample2',
      component: () => import('@/views/multilevel_menu_example/page.vue'),
      meta: {
        title: '学习计划',
      }
    },
    {
      path: 'level2',
      name: 'multilevelMenuExample2',
      component: () => import('@/views/multilevel_menu_example/page.vue'),
      meta: {
        title: '任务日历',
      }
    },
    {
      path: 'level2',
      name: 'multilevelMenuExample2',
      component: () => import('@/views/multilevel_menu_example/page.vue'),
      meta: {
        title: '任务管理',
      }
    },
    {
      path: 'level2',
      name: 'multilevelMenuExample2',
      component: () => import('@/views/multilevel_menu_example/page.vue'),
      meta: {
        title: '树洞鸭聊天',
      }
    },
    {
      path: 'level2',
      name: 'multilevelMenuExample2',
      component: () => import('@/views/multilevel_menu_example/page.vue'),
      meta: {
        title: '错题本',
      }
    },
    {
      path: 'level2',
      name: 'multilevelMenuExample2',
      component: () => import('@/views/multilevel_menu_example/page.vue'),
      meta: {
        title: '学习分析',
      }
    },
  ],
}

export default routes
