<script setup lang="ts">
import type { StudyPlan } from '@/api/modules/studyPlan'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { toast } from 'vue-sonner'
import api, { PlanType } from '@/api/modules/studyPlan'

const addPlanDialogVisible = defineModel({ default: false })
const planForm = reactive<StudyPlan>({
  id: null,
  startDate: null,
  endDate: null,
  subject: null,
  dailyStudyHours: null,
  availableDays: null,
  school: null,
  major: null,
  planType: null,
  candidateType: null,
  progressDescription: null,
})

// 选择计划类型
function selectPlanType(planType: PlanType) {
  planForm.planType = planType
}

async function updateStudyPlan() {
  await api.updateStudyPlan(planForm)
  toast.success('学习计划已提交！')
  addPlanDialogVisible.value = false
}
</script>

<template>
  <!-- 添加计划弹窗 -->
  <el-dialog v-model="addPlanDialogVisible" title="添加学习计划" header-class="font-bold">
    <div v-if="!planForm.planType" class="plan-type-selection">
      <h4>请选择学习计划类型</h4>
      <div class="plan-types">
        <el-card class="plan-type-card" @click="selectPlanType(PlanType.government)">
          <div class="plan-type-content">
            <FontAwesomeIcon :icon="['fas', 'fa-landmark']" size="3x" />
            <span>考公</span>
          </div>
        </el-card>
        <el-card class="plan-type-card" @click="selectPlanType(PlanType.postgrad)">
          <div class="plan-type-content">
            <FontAwesomeIcon :icon="['fas', 'fa-graduation-cap']" size="3x" />
            <span>考研</span>
          </div>
        </el-card>
        <el-card class="plan-type-card" @click="selectPlanType(PlanType.certificate)">
          <div class="plan-type-content">
            <FontAwesomeIcon :icon="['fas', 'fa-certificate']" size="3x" />
            <span>考证</span>
          </div>
        </el-card>
      </div>
    </div>

    <div v-else class="plan-form">
      <el-form :model="planForm" label-position="top">
        <template v-if="planForm.planType === PlanType.government">
          <el-form-item label="目标城市">
            <el-input v-model="planForm.school" placeholder="请输入目标城市" />
          </el-form-item>
          <el-form-item label="目标岗位">
            <el-input v-model="planForm.subject" placeholder="请输入目标岗位" />
          </el-form-item>
        </template>
        <template v-if="planForm.planType === PlanType.postgrad">
          <el-form-item label="目标学校">
            <el-input v-model="planForm.school" placeholder="请输入目标学校" />
          </el-form-item>
          <el-form-item label="目标专业">
            <el-input v-model="planForm.major" placeholder="请输入目标专业" />
          </el-form-item>
        </template>
        <template v-if="planForm.planType === PlanType.certificate">
          <el-form-item label="目标证书">
            <el-input v-model="planForm.major" placeholder="请输入目标证书" />
          </el-form-item>
        </template>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="planForm.startDate"
            type="date"
            placeholder="选择开始时间"
            value-format="YYYY-MM-DD"
            class="!w-full"
          />
        </el-form-item>
        <el-form-item label="考试时间">
          <el-date-picker
            v-model="planForm.endDate"
            type="date"
            placeholder="选择考试时间"
            value-format="YYYY-MM-DD"
            class="!w-full"
          />
        </el-form-item>
        <el-form-item label="考生类型">
          <el-select v-model="planForm.candidateType" placeholder="请选择考生类型">
            <el-option label="脱产考生" :value="1" />
            <el-option label="在职考生" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="可用于学习的时间">
          <el-select
            :model-value="planForm.availableDays ? planForm.availableDays.split(',') : []"
            placeholder="请选择可用于学习的时间"
            multiple
            @update:model-value="val => planForm.availableDays = val.join(',')"
          >
            <el-option value="1" label="星期一" />
            <el-option value="2" label="星期二" />
            <el-option value="3" label="星期三" />
            <el-option value="4" label="星期四" />
            <el-option value="5" label="星期五" />
            <el-option value="6" label="星期六" />
            <el-option value="7" label="星期日" />
          </el-select>
        </el-form-item>
        <el-form-item label="每日可学习时长">
          <el-input-number
            v-model="planForm.dailyStudyHours"
            :min="0"
            :max="16"
            placeholder="请输入每日可学习时长（小时）"
            class="!w-full"
          />
        </el-form-item>
        <el-form-item label="当前备考进度">
          <el-input
            v-model="planForm.progressDescription"
            type="textarea"
            autosize
            placeholder="请输入当前备考进度（最多100字）"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>

    <template v-if="planForm.planType" #footer>
      <div class="flex justify-between">
        <el-button @click="planForm.planType = null">
          上一步
        </el-button>
        <el-button type="primary" @click="updateStudyPlan">
          提交计划
        </el-button>
      </div>
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
