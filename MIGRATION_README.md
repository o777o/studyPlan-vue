# 督学系统迁移说明

## 概述
本项目将原有的HTML页面迁移到Vue 3 + Element Plus框架中，保持了原有的功能和界面设计。

## 迁移的页面

### 1. 学习计划页面 (`/study-plan`)
- **文件位置**: `src/views/StudyPlan.vue`
- **功能特性**:
  - 三栏布局：计划树、日历、任务列表
  - 使用Element Plus的Tree组件实现计划树
  - 使用Element Plus的Card组件实现任务卡片
  - 使用Element Plus的Dialog组件实现添加计划和答题弹窗
  - 支持日历导航和任务管理

### 2. 树洞鸭聊天页面 (`/chat`)
- **文件位置**: `src/views/Chat.vue`
- **功能特性**:
  - 使用Element Plus的Card组件实现聊天界面
  - 支持消息发送和接收
  - 快捷回复功能
  - 自动滚动到底部
  - 清空聊天记录功能

### 3. 错题本页面 (`/wrong-questions`)
- **文件位置**: `src/views/WrongQuestions.vue`
- **功能特性**:
  - 使用Element Plus的Card组件实现题目卡片
  - 使用Element Plus的Select组件实现筛选功能
  - 支持题目展开/收起
  - 支持批量操作
  - 支持题目状态管理

### 4. 首页概览更新
- **文件位置**: `src/views/index.vue`
- **功能特性**:
  - 添加快捷入口，支持页面跳转
  - 保持原有的数据展示卡片
  - 保持原有的操作记录列表

## 技术栈

### 前端框架
- **Vue 3**: 使用Composition API
- **TypeScript**: 提供类型安全
- **Element Plus**: UI组件库
- **Vue Router**: 路由管理

### 主要组件替换

| 原HTML组件 | Element Plus组件 | 说明 |
|-----------|-----------------|------|
| 自定义按钮 | `el-button` | 统一样式和交互 |
| 自定义卡片 | `el-card` | 卡片容器 |
| 自定义弹窗 | `el-dialog` | 模态对话框 |
| 自定义树形结构 | `el-tree` | 树形数据展示 |
| 自定义输入框 | `el-input` | 表单输入 |
| 自定义选择器 | `el-select` | 下拉选择 |
| 自定义进度条 | `el-progress` | 进度显示 |
| 自定义标签 | `el-tag` | 状态标签 |
| 自定义单选框 | `el-radio` | 单选按钮组 |

## 路由配置

新增的路由配置在 `src/router/routes.ts` 中：

```typescript
{
  meta: {
    title: '学习管理',
    icon: 'i-ant-design:book-outlined',
  },
  children: [
    {
      path: '/study-plan',
      name: 'StudyPlan',
      component: () => import('@/views/StudyPlan.vue'),
      meta: {
        title: '学习计划',
        icon: 'i-ant-design:calendar-outlined',
      },
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('@/views/Chat.vue'),
      meta: {
        title: '树洞鸭聊天',
        icon: 'i-ant-design:message-outlined',
      },
    },
    {
      path: '/wrong-questions',
      name: 'WrongQuestions',
      component: () => import('@/views/WrongQuestions.vue'),
      meta: {
        title: '错题本',
        icon: 'i-ant-design:book-outlined',
      },
    },
  ],
}
```

## 功能保持

### 学习计划页面
- ✅ 计划树形结构展示
- ✅ 日历视图和导航
- ✅ 任务列表和进度显示
- ✅ 添加学习计划弹窗
- ✅ 答题验证弹窗
- ✅ 响应式布局

### 树洞鸭聊天页面
- ✅ 聊天消息展示
- ✅ 消息发送功能
- ✅ 快捷回复
- ✅ 自动回复模拟
- ✅ 清空记录功能

### 错题本页面
- ✅ 题目列表展示
- ✅ 筛选功能（科目、难度、状态）
- ✅ 题目展开/收起
- ✅ 批量操作
- ✅ 题目状态管理

## 样式优化

- 使用Element Plus的设计系统，保持界面一致性
- 响应式设计，支持移动端和桌面端
- 优化了交互体验，添加了hover效果和过渡动画
- 保持了原有的色彩方案和布局结构

## 开发说明

### 启动项目
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 注意事项

1. 所有页面都使用了Vue 3的Composition API
2. 使用了TypeScript提供类型安全
3. 遵循了Element Plus的设计规范
4. 保持了原有的功能逻辑和用户体验
5. 代码结构清晰，便于维护和扩展

## 后续优化建议

1. 添加数据持久化（localStorage或API接口）
2. 完善错误处理和加载状态
3. 添加更多交互功能
4. 优化移动端体验
5. 添加单元测试

