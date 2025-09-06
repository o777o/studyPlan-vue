import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/mock/app/route/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: [
          {
            meta: {
              title: '演示',
              icon: 'uim:box',
            },
            children: [
              {
                path: '/multilevel_menu_example',
                component: 'Layout',
                name: 'multilevelMenuExample',
                meta: {
                  title: '仪表盘',
                  icon: 'heroicons-solid:menu-alt-3',
                }
              },
              {
                path: '/multilevel_menu_example',
                component: 'Layout',
                name: 'multilevelMenuExample',
                meta: {
                  title: '学习计划',
                  icon: 'heroicons-solid:menu-alt-3',
                }
              },
              {
                path: '/multilevel_menu_example',
                component: 'Layout',
                name: 'multilevelMenuExample',
                meta: {
                  title: '任务日历',
                  icon: 'heroicons-solid:menu-alt-3',
                }
              },
              {
                path: '/multilevel_menu_example',
                component: 'Layout',
                name: 'multilevelMenuExample',
                meta: {
                  title: '任务管理',
                  icon: 'heroicons-solid:menu-alt-3',
                }
              },
              {
                path: '/multilevel_menu_example',
                component: 'Layout',
                name: 'multilevelMenuExample',
                meta: {
                  title: '树洞鸭聊天',
                  icon: 'heroicons-solid:menu-alt-3',
                }
              },
              {
                path: '/multilevel_menu_example',
                component: 'Layout',
                name: 'multilevelMenuExample',
                meta: {
                  title: '错题本',
                  icon: 'heroicons-solid:menu-alt-3',
                }
              },
              {
                path: '/multilevel_menu_example',
                component: 'Layout',
                name: 'multilevelMenuExample',
                meta: {
                  title: '学习分析',
                  icon: 'heroicons-solid:menu-alt-3',
                }
              },
            ],
          },
        ],
      }
    },
  },
  {
    url: '/mock/app/menu/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: [
          {
            meta: {
              title: '演示',
              icon: 'uim:box',
            },
            children: [
              {
                path: '/multilevel_menu_example/page',
                meta: {
                  title: '首页概览',
                },
              },
              {
                path: '/multilevel_menu_example/page',
                meta: {
                  title: '学习计划',
                },
              },{
                path: '/multilevel_menu_example/page',
                meta: {
                  title: '任务日历',
                },
              },{
                path: '/multilevel_menu_example/page',
                meta: {
                  title: '任务管理',
                },
              },{
                path: '/multilevel_menu_example/page',
                meta: {
                  title: '树洞鸭聊天',
                },
              },{
                path: '/multilevel_menu_example/page',
                meta: {
                  title: '错题本',
                },
              },{
                path: '/multilevel_menu_example/page',
                meta: {
                  title: '学习分析',
                },
              }
            ],
          },
        ],
      }
    },
  },
])
