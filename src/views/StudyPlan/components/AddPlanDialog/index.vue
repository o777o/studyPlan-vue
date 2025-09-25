<script setup lang="ts">
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const addPlanDialogVisible = defineModel({ default: false })
const planForm = reactive({
  type: '',
  targetCity: '',
  targetPosition: '',
  examDate: '',
  candidateType: '',
  studyTime: {
    monday: { start: '09:00', end: '21:00' },
    tuesday: { start: '09:00', end: '21:00' },
    wednesday: { start: '09:00', end: '21:00' },
    thursday: { start: '09:00', end: '21:00' },
    friday: { start: '09:00', end: '21:00' },
    saturday: { start: '09:00', end: '21:00' },
    sunday: { start: '09:00', end: '21:00' },
  },
  currentProgress: '',
})
</script>

<template>
  <!-- 添加计划弹窗 -->
  <el-dialog v-model="addPlanDialogVisible" title="添加学习计划" header-class="question-dialog font-bold">
    <div class="plan-type-selection">
      <h4>请选择学习计划类型</h4>
      <div class="plan-types">
        <!-- <el-card
          class="plan-type-card"
          :class="{ active: planForm.type === 'civil-service' }"
          @click="selectPlanType('civil-service')"
        >
          <div class="plan-type-content">
            <FontAwesomeIcon :icon="['fas', 'fa-landmark']" size="3x" />
            <span>考公</span>
          </div>
        </el-card>
        <el-card
          class="plan-type-card"
          :class="{ active: planForm.type === 'postgraduate' }"
          @click="selectPlanType('postgraduate')"
        >
          <div class="plan-type-content">
            <FontAwesomeIcon :icon="['fas', 'fa-graduation-cap']" size="3x" />
            <span>考研</span>
          </div>
        </el-card>
        <el-card
          class="plan-type-card"
          :class="{ active: planForm.type === 'certification' }"
          @click="selectPlanType('certification')"
        >
          <div class="plan-type-content">
            <FontAwesomeIcon :icon="['fas', 'fa-certificate']" size="3x" />
            <span>考证</span>
          </div>
        </el-card> -->
      </div>
    </div>

    <div v-if="planForm.type" class="plan-form">
      <el-form :model="planForm" label-width="120px">
        <el-form-item label="目标城市">
          <el-input v-model="planForm.targetCity" placeholder="请输入目标城市" />
        </el-form-item>
        <el-form-item label="目标岗位">
          <el-input v-model="planForm.targetPosition" placeholder="请输入目标岗位" />
        </el-form-item>
        <el-form-item label="考试时间">
          <el-date-picker
            v-model="planForm.examDate"
            type="date"
            placeholder="选择考试时间"
          />
        </el-form-item>
        <el-form-item label="考生类型">
          <el-select v-model="planForm.candidateType" placeholder="请选择考生类型">
            <el-option label="脱产考生" value="full-time" />
            <el-option label="在职考生" value="part-time" />
          </el-select>
        </el-form-item>
        <el-form-item label="当前备考进度">
          <el-input
            v-model="planForm.currentProgress"
            type="textarea"
            :rows="3"
            placeholder="请输入当前备考进度（最多100字）"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <el-button @click="addPlanDialogVisible = false">
        取消
      </el-button>
      <el-button type="primary">
        提交计划
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.plan-type-selection {
  margin-bottom: 30px;
  text-align: center;
}

.plan-type-selection h4 {
  margin-bottom: 20px;
  color: #666;
}

.plan-types {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.plan-type-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  cursor: pointer;
  background-color: #fff9c2;
  transition: all 0.3s;
}

.plan-type-card:hover {
  background-color: hsl(var(--primary));
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  transform: translateY(-5px);
}

.plan-type-card.active {
  color: white;
  background: #409eff;
}

.plan-type-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.plan-type-content span {
  font-size: 16px;
  font-weight: 500;
}

.plan-form {
  margin-top: 20px;
}
</style>
