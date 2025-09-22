<route lang="yaml">
meta:
  title: 树洞鸭聊天
  icon: i-ant-design:message-outlined
</route>

<script setup lang="ts">
import { Bot, Send } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { nextTick, ref } from 'vue'

// 聊天消息列表
const messages = ref([
  {
    id: 1,
    type: 'bot',
    content: '你好！我是树洞鸭，有什么烦恼都可以告诉我哦～',
    time: '09:05',
    avatar: '🦆',
  },
  {
    id: 2,
    type: 'user',
    content: '最近学习压力好大，感觉时间不够用',
    time: '09:06',
    avatar: '👤',
  },
  {
    id: 3,
    type: 'bot',
    content: '我理解你的感受。学习压力大是正常的，重要的是找到适合自己的节奏。可以尝试把大目标分解成小任务，每天完成一点点，这样压力会小很多哦！',
    time: '09:06',
    avatar: '🦆',
  },
])

// 输入框内容
const inputMessage = ref('')

// 聊天容器引用
const chatContainer = ref<HTMLElement>()

// 发送消息
async function sendMessage() {
  const message = inputMessage.value.trim()
  if (!message) {
    ElMessage.warning('请输入消息内容')
    return
  }

  // 添加用户消息
  const userMessage = {
    id: Date.now(),
    type: 'user',
    content: message,
    time: new Date().toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    avatar: '👤',
  }

  messages.value.push(userMessage)
  inputMessage.value = ''

  // 滚动到底部
  await nextTick()
  scrollToBottom()

  // 模拟AI回复
  setTimeout(() => {
    const botReplies = [
      '我理解你的感受，学习确实需要坚持和耐心。',
      '建议你可以制定一个合理的学习计划，把大目标分解成小目标。',
      '记住，学习是一个循序渐进的过程，不要给自己太大压力。',
      '可以尝试番茄工作法，25分钟专注学习，然后休息5分钟。',
      '保持积极的心态很重要，相信自己一定可以做到的！',
      '如果遇到困难，可以随时找我聊天，我会一直陪伴你的。',
      '学习路上有挫折是正常的，关键是要从中吸取经验。',
      '建议你多和同学交流，互相鼓励和支持。',
      '记住，每一次努力都不会白费，坚持下去就会有收获。',
      '学习之余也要注意休息，劳逸结合才能提高效率。',
    ]

    const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)]
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: randomReply,
      time: new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      avatar: '🦆',
    }

    messages.value.push(botMessage)
    scrollToBottom()
  }, 1000 + Math.random() * 2000) // 1-3秒随机延迟
}

// 滚动到底部
function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// 处理回车键发送
function handleKeyPress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

// 快捷回复选项
const quickReplies = ref([
  '学习压力大怎么办？',
  '如何制定学习计划？',
  '如何提高学习效率？',
  '考试焦虑怎么缓解？',
  '如何保持学习动力？',
])

// 发送快捷回复
function sendQuickReply(reply: string) {
  inputMessage.value = reply
  sendMessage()
}

// 清空聊天记录
function clearChat() {
  messages.value = [
    {
      id: 1,
      type: 'bot',
      content: '你好！我是树洞鸭，有什么烦恼都可以告诉我哦～',
      time: '09:05',
      avatar: '🦆',
    },
  ]
}

// 初始化
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="chat-page">
    <div class="chat-container">
      <!-- 聊天头部 -->
      <div class="chat-header">
        <div class="chat-title">
          <el-icon class="chat-icon">
            <Bot />
          </el-icon>
          <h2>树洞鸭聊天</h2>
        </div>
        <div class="chat-actions">
          <el-button size="small" @click="clearChat">
            清空记录
          </el-button>
        </div>
      </div>

      <!-- 聊天消息区域 -->
      <div ref="chatContainer" class="chat-messages">
        <div
          v-for="message in messages"
          :key="message.id"
          class="message"
          :class="`message-${message.type}`"
        >
          <div class="message-avatar">
            <span class="avatar-text">{{ message.avatar }}</span>
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <div class="message-text">
                {{ message.content }}
              </div>
              <div class="message-time">
                {{ message.time }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 快捷回复 -->
      <div class="quick-replies">
        <div class="quick-replies-title">
          快捷回复：
        </div>
        <div class="quick-replies-list">
          <el-tag
            v-for="reply in quickReplies"
            :key="reply"
            class="quick-reply-tag"
            @click="sendQuickReply(reply)"
          >
            {{ reply }}
          </el-tag>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="chat-input-area">
        <div class="input-container">
          <el-input
            v-model="inputMessage"
            type="textarea"
            :rows="3"
            placeholder="输入消息...（按Enter发送，Shift+Enter换行）"
            class="message-input"
            @keydown="handleKeyPress"
          />
          <el-button
            type="primary"
            :icon="Send"
            class="send-button"
            @click="sendMessage"
          >
            发送
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-page {
  height: 100%;
  padding: 20px;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.chat-title {
  display: flex;
  gap: 10px;
  align-items: center;
}

.chat-icon {
  font-size: 24px;
  color: #409eff;
}

.chat-title h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.chat-messages {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  overflow-y: auto;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 80%;
}

.message-user {
  flex-direction: row-reverse;
  margin-left: auto;
}

.message-bot {
  flex-direction: row;
}

.message-avatar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.message-user .message-avatar {
  background: #409eff;
}

.message-bot .message-avatar {
  background: #67c23a;
}

.avatar-text {
  font-size: 20px;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-bubble {
  position: relative;
  padding: 12px 16px;
  word-wrap: break-word;
  border-radius: 12px;
}

.message-user .message-bubble {
  color: white;
  background: #409eff;
  border-bottom-right-radius: 4px;
}

.message-bot .message-bubble {
  color: #333;
  background: #f0f9ff;
  border-bottom-left-radius: 4px;
}

.message-text {
  margin-bottom: 4px;
  line-height: 1.5;
}

.message-time {
  font-size: 12px;
  opacity: 0.7;
}

.message-user .message-time {
  text-align: right;
}

.quick-replies {
  padding: 16px 20px;
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}

.quick-replies-title {
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.quick-replies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-reply-tag {
  cursor: pointer;
  transition: all 0.2s;
}

.quick-reply-tag:hover {
  color: white;
  background: #409eff;
}

.chat-input-area {
  padding: 20px;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.input-container {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
}

.send-button {
  height: 40px;
  padding: 0 20px;
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式设计 */
@media (width <= 768px) {
  .chat-page {
    padding: 10px;
  }

  .message {
    max-width: 90%;
  }

  .quick-replies-list {
    flex-direction: column;
  }

  .input-container {
    flex-direction: column;
    align-items: stretch;
  }

  .send-button {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
