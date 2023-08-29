<template>
  <view class="index">
    <view class="header">
      <view>从今天算起3天内的指定范围 {{ getRange }} 可选</view>
    </view>
    <nut-form class="wrapper" :model-value="form">
      <nut-form-item
        v-for="val in rows"
        :label="val.label"
        :prop="val.prop"
        :required="val.required"
        :rules="rules[val.prop as string]"
        label-width="144"
      >
        <div div class="picker flex-bwt" style="display: flex;justify-content: space-between;" @click="toggleDatepicker(val)">
          <span
            :class="[form[val.prop as string] === '' ? 'custom-input': 'normal-input']"
          >
            {{ form[val.prop] || val.placeholder }}
          </span>
          <nut-icon :class="['normal-input']" name="rect-right"></nut-icon>
        </div>
        <DatePicker
          @datePickerCancellEvent="() => datePickerCancellEvent(val)"
          @datePickerOkEvent="(res) => datePickerOk(res, val)"
          :isShowDatePicker="val.visible"
          mode="YMDhm"
          :min-date="form['stime']"
          :data="val.data"
          :date-checked="val.date_checked"
          :date="form[val.prop as string]"
        ></DatePicker>
      </nut-form-item>
    </nut-form>
  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import DatePicker from "../../components/a-date-picker/index.vue";
import { useDatePicker } from "../../use";
import { ROWS, RULES, baseHourEnd, baseHourStart, baseMinuteEnd, baseMinuteStart } from '../../constants'
import "./index.less";
import { showToast } from "../../utils/util";


const getRange = computed(() => {
  return `${baseHourStart}:${baseMinuteStart} 至 ${baseHourEnd}:${baseMinuteEnd}`
})
const rows = ref(ROWS)
const rules = ref(RULES)
const form = reactive({
  stime: '',
  etime: ''
});
const { datePickerCancellEvent, datePickerOkEvent } = useDatePicker(form);

// 日期时间
const datePickerOk = (item, value) => {
  const st_prop = "stime",
    et_prop = "etime";
  datePickerOkEvent(item, value, st_prop, et_prop);
};
// 日期
const toggleDatepicker = (val) => {
  if(val.prop === 'etime'){
    if(form['stime'] === ''){
      showToast("请先选择开始时间", "none")
      return;
    }
  }
  val.visible = true
}
</script>
<style lang="less">
@import url('./index.less');
</style>