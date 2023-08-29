<template>
  <view v-if="canShow" class="mask" @click="onCancellClick"></view>
  <view :class="['content', canShow ? 'view-show' : 'view-hidde']">
    <view class="datepicker" style="z-index:2022">
      <view class="ok-c">
        <!-- catchclick -->
        <view @click="onCancellClick" class="cancell">取消</view>
        <view @click="onOkClick" class="ok">确定</view>
      </view>
      <view class="divider"></view>
      <picker-view
        indicator-style="height: 50px;"
        style="width: 100%; height: 250px; background-color: white; font-size: 30rpx"
        :value="value"
        @change="bindChange"
      >
        <picker-view-column v-if="isShowYear">
          <view 
            v-for="(item, index) in years" 
            :key="index" 
            class="item"
            :style="{color: item === year ? '#000' : ''}">
            <text>{{ item }}年</text>
          </view>
        </picker-view-column>
        <picker-view-column v-if="isShowMonth">
          <view
            v-for="(item, index) in months"
            :key="index"
            class="item"
            :style="{lineHeight: '50px', color: item === month ? '#000' : ''}"
          >
            <text>{{ item }}月</text>
          </view>
        </picker-view-column>
        <picker-view-column v-if="isShowDay">
          <view
            v-for="(item, index) in days"
            :key="index"
            class="item"
            :style="{lineHeight: '50px', color: item === day ? '#000' : ''}"
          >
            <text>{{ item }}日</text>
          </view>
        </picker-view-column>
        <picker-view-column v-if="isShowHour">
          <view
            v-for="(item, index) in hours"
            :key="index"
            class="item"
            :style="{lineHeight: '50px', color: item === hour ? '#000' : ''}"
          >
            <text>{{ item }}时</text>
          </view>
        </picker-view-column>
        <picker-view-column v-if="isShowMinutes">
          <view
            v-for="(item, index) in minutes"
            :key="index"
            class="item"
            :style="{lineHeight: '50px', color: item === minute ? '#000' : ''}"
          >
            <text>{{ item }}分</text>
          </view>
        </picker-view-column>
        <picker-view-column v-if="isShowSeconds">
          <view
            v-for="(item, index) in seconds"
            :key="index"
            class="item"
            style="line-height: 50px"
          >
            <text>{{ item }}秒</text>
          </view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import dateUtil from "../../utils/date";
import { baseHourEnd, baseHourStart, baseMinuteEnd, baseMinuteStart } from "../../constants";

const props = withDefaults(defineProps<{
  data: {},
  date: number | string
  mode: string,
  isShowDatePicker: boolean,
  minDate: string
  dateChecked: string
}>(), {
  // data: {
  //   type: 'YMDhm'
  // },
  date: 0,
  mode: 'MD',
  isShowDatePicker: false,
  minDate: '',
  dateChecked: ''
})

const emit = defineEmits<{
  (event: 'datePickerCancellEvent'): void
  (event: 'datePickerOkEvent', item: {
    data: {}
    date: number | string
  }): void
  (event: 'resetDate'): void
}>()

const getResultDate = () => resultValue.value.map(v => (dateUtil.formatNumber(v)));

const isBetweenOfficeHours = () => {
  return dateUtil.isInSpecifiedTime(baseHourStart, baseHourEnd, baseMinuteStart, baseMinuteEnd);
}

let YEARS: number[] = [];
let MONTHS: number[] = [];
let DAYS: number[] = [];
let HOURS: number[] = [];
let MINUTES: number[] = [];
let SECONDS: number[] = [];

for (let i = 2022; i <= 2025; i++) {
  YEARS.push(i);
}

for (let i = 1; i <= 12; i++) {
  MONTHS.push(i);
}

for (let i = 1; i <= 31; i++) {
  DAYS.push(i);
}

// 无论当前时间是否在指定范围内，可选的时间范围一定以 baseHourEnd 结束。开始时间则不一定
const today = new Date();
let today_date = today.getTime();
const bhs = isBetweenOfficeHours() ? dateUtil.getHour(today_date) : baseHourStart
for (let i = bhs; i < baseHourEnd; i++) {
  HOURS.push(i);
}

// 判断当前时间是否在08:30-18:00区间，如果是，则计算的是0-59，否，则计算的是30-59
const minStart = isBetweenOfficeHours() ? dateUtil.getFinalMinute() : baseMinuteStart;
for (let j = minStart; j < 60; j++) {
  MINUTES.push(j);
}

for (let i = 0; i < 60; i++) {
  SECONDS.push(i);
}

const canShow = ref(false);

// const modes = ["YMDhms", "YMDhm", "YMD", "MD", "hm"];

// let beforeYear;
// let beforeMonth;
const resultValue = ref<number[]>([]);

const date = ref(0);
// const cMode: string = ref("");
const years = ref(YEARS);
const months = ref(MONTHS);
const days = ref<number[]>(DAYS);
const hours = ref(HOURS);
const minutes = ref<number[]>(MINUTES);
const seconds = ref<number[]>(SECONDS);
const value = ref<number[]>([]);

const isShowYear = ref(false);
const isShowMonth = ref(false);
const isShowDay = ref(false);
const isShowHour = ref(false);
const isShowMinutes = ref(false);
const isShowSeconds = ref(false);

const year = ref(0);
const month = ref(0);
const day = ref<number>(0);
const hour = ref(0);
const minute = ref<number>(0);
const second = ref<number>(0);

// 星期几
const isWeekDay = (day) => day.getDay() !== 0 && day.getDay() !== 6
const getFutureThreeWeekDay = () => {
  // 如果超过当天的18:00，则从次日开始即1，否则，计算当天即0
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), baseHourEnd, baseMinuteEnd)
  const ONEDAY = 24 * 60 * 60 * 1000
  let daysToAdd = now > end ? 1 : 0;
  let weekdays: Date[] = [];
  while(weekdays.length < 3){
    const new_date = new Date(date.value + daysToAdd * ONEDAY)
    if(isWeekDay(new_date)){
      weekdays.push(new_date);
    }
    daysToAdd++;
  }

  return weekdays;
}

const threeWeekDays = ref<Date[]>([])
// 首次渲染
const setDateByMode = () => {
  // 获取当前时刻的年月日时分秒
  const today = new Date()
  date.value = today.getTime();
  
  year.value = dateUtil.getYear(date.value);
  month.value = dateUtil.getMonth(date.value);
  day.value = dateUtil.getDay(date.value);

  hour.value = dateUtil.getHour(date.value) < baseHourStart ? baseHourStart : dateUtil.getHour(date.value);
  // 当前如果不是起始的时间，那么就用当前的分钟，否则就用起始的分钟
  minute.value = dateUtil.getHour(date.value) !== baseHourStart ? dateUtil.getFinalMinute() : baseMinuteStart;
  second.value = dateUtil.getSecond(date.value);
  
  // 获取未来3个工作日的时间戳
  threeWeekDays.value = getFutureThreeWeekDay()

  years.value = YEARS.filter(y => threeWeekDays.value.some(w => w.getFullYear() === y))
  months.value = MONTHS.filter(m => threeWeekDays.value.some(w => w.getMonth() === m - 1))
  days.value = DAYS.filter(d => threeWeekDays.value.some(w => w.getDate() === d))
  console.log('年月日', years.value, months.value, days.value)

  setDays(year.value, month.value, day.value, hour.value, minute.value, second.value);
  // beforeYear = year.value;
  // beforeMonth = month.value;

  const _y = years.value.findIndex(v => v === year.value)
  const _m = months.value.findIndex(v => v === month.value)
  const _d = days.value.findIndex(v => v === day.value)
  const _h = hours.value.findIndex(v => v === hour.value)
  const _min = minutes.value.findIndex(v => v === minute.value)

  value.value = [_y, _m, _d, _h, _min, second.value];

  // console.log('...',value.value,year.value, month.value, day.value, hour.value, minute.value, second.value)
  
  resultValue.value = [year.value, month.value, day.value, hour.value, minute.value, second.value];

  setColumns();
};

const setColumns = () => {
  let mode = props.mode;

  isShowYear.value = mode === "YMDhms" || mode === "YMDhm" || mode === "YMD";
  isShowMonth.value =
    mode === "YMDhms" || mode === "YMDhm" || mode === "YMD" || mode === "MD";
  isShowDay.value =
    mode === "YMDhms" || mode === "YMDhm" || mode === "YMD" || mode === "MD";
  isShowHour.value = mode === "YMDhms" || mode === "YMDhm" || mode === "hm";
  isShowMinutes.value = mode === "YMDhms" || mode === "YMDhm" || mode === "hm";
  isShowSeconds.value = mode === "YMDhms";

};

const setDays = (_year, _month, _day, _hour, _minute, _second) => {
  // console.log('...',year, resultValue.value)
  // if (year != beforeYear || beforeMonth != month) {
  //   beforeYear = year;
  //   beforeMonth = month;

    // console.log('==========')
    // console.log(years.value, months.value, days.value)
    // console.log(year.value)
    // console.log(month.value)
    // console.log(day.value)
    // value.value = [year, month, day.value, hour.value, minute.value, second.value];

    const r = JSON.parse(JSON.stringify(resultValue.value))
    const _y = years.value[r[0]]
    const _m = months.value[r[1]]
    const _d = days.value[r[2]]
    const _h = hours.value[r[3]]
    const _min = minutes.value[r[4]]

    value.value = r;
    
    resultValue.value = [_y, _m, _d, _h, _min, second.value];

    // console.log(value.value, resultValue.value)
    
  // }else{
    
  //   // value.value = [year, month, _day, _hour, _minute, _second];

  //   const _y = years.value.findIndex(v => v === year.value)
  //   const _m = months.value.findIndex(v => v === month.value)
  //   const _d = days.value.findIndex(v => v === day.value)
  //   const _h = hours.value.findIndex(v => v === hour.value)
  //   const _min = minutes.value.findIndex(v => v === minute.value)

  //   value.value = [_y, _m, _d, _h, _min, second.value];

    
  //   resultValue.value = value.value;
  // }
  // console.log('setDays: ', value.value, resultValue.value, minute.value);
  
};

watch(() => props.minDate, () => {
  if(props.minDate){
    // 证明起始日期不为空
    console.log('执行一次', props)
  }
}, {
  immediate: true,
  deep: true
})

const bindChange = (e) => {
  const val = e.detail.value;
  const min_date = props.minDate.replace(/\-/g, '/')
  console.log('bindChange:', val, props.minDate, min_date, value.value, resultValue.value)
  console.log('days..', days.value[val[2]], resultValue.value[2])
  // 滚轮滚的是day
  if(days.value[val[2]] !== resultValue.value[2]){
    console.log('day 不同')
    // 重新计算hour和minute
    // 如果不是今天，则直接用 baseHourStart 和 baseHourEnd 如果是今天，则用当前 hour 但 end 依然是 baseHourEnd
    const today = new Date()
    let today_date = today.getTime();
    const today_day = dateUtil.getDay(today_date)

    // 改 hour
    HOURS = []
    console.log(today_day, days.value[val[2]]);
    
    if(today_day !== days.value[val[2]]){
      // 非今天，则 hour 范围是 baseHourStart ~ baseHourEnd
      for (let i = baseHourStart; i < baseHourEnd; i++) {
        HOURS.push(i);
      }
      // 改 minute
      // 非今天，根据 hour 判断，如果是 baseStart 才行
      MINUTES = []
      // hour 要重置为 baseHourStart ，所以 minute 也是固定为 baseMinuteStart 
      for (let j = baseMinuteStart; j < 60; j++) {
        MINUTES.push(j);
      }
      // 由于非今天所以要重置 hour 索引，例如回到 8 点
      val[3] = 0;
    }else{
      // 今天，则还要判断是否为指定范围时间内，如果是，hour 范围是 当前hour ~ baseHourEnd 。否则用的是 baseHourStart ~ baseHourEnd
      const today = new Date();
      let today_date = today.getTime();
      const bhs = isBetweenOfficeHours() ? dateUtil.getHour(today_date) : baseHourStart
      for (let i = bhs; i < baseHourEnd; i++) {
        HOURS.push(i);
      }
      // 改 minute
      // 今天，判断当前时间是否在 08:30-18:00 区间，如果是，则计算的是 0-59 ，否，则计算的是 30-59 
      MINUTES = []
      const minStart = isBetweenOfficeHours() ? baseMinuteEnd : baseMinuteStart;
      for (let j = minStart; j < 60; j++) {
        MINUTES.push(j);
      }
    }
    hours.value = HOURS;
    minutes.value = MINUTES;
  }

  console.log('hours..', hours.value[val[3]], resultValue.value[3])
  // 滚轮滚的是 hour
  // 当前选择的时间所对应的 hour ，如果和上一次选的不同，进入判断
  let currSelectHour = hours.value[val[3]]
  if(currSelectHour !== resultValue.value[3]){
    console.log('hour 不同')
    MINUTES = []

    const today = new Date()
    let today_date = today.getTime();
    const today_day = dateUtil.getDay(today_date)
    console.log('今天几号、当前选中的是几号', today_day, days.value[val[2]]);
    
    if(today_day !== days.value[val[2]]){
      // 非今天
      pushItemIntoMinutes(currSelectHour)
    }else{
      // 今天
      // 是否为当前hour，如果是，起始分钟就是当前分钟，如果不是就用0-59
      const today = new Date();
      let today_date = today.getTime();
      const today_hour = dateUtil.getHour(today_date)
      const today_minute = dateUtil.getFinalMinute()
      if(currSelectHour === today_hour){
        console.log('当前hour')
        // 就算是选中的hour恰好是当前hour，也可能出现“当前hour是8:05在时间段8:30范围外”的情况。所以要判断如果在范围外，则依然用30为起始
        const bms = isBetweenOfficeHours() ? today_minute : baseMinuteStart
        for(let j = bms; j < 60; j++){
          MINUTES.push(j);
        }
      }else {
        pushItemIntoMinutes(currSelectHour)
      }
    }
    minutes.value = MINUTES;
    // 重置 minute 索引
    val[4] = 0;
    console.log(MINUTES, val)
  }

  if(min_date){
    // const timeStamp = new Date(min_date).getTime();

    console.log('已有起始时间',min_date,val,props.dateChecked)
    
    // let _year = years.value[val[0]];
    // let _month = months.value[val[1]] - 1;
    // let _day = days.value[val[2]];
    // let _hour = hours.value[val[3]] || 0;
    // let _minute = minutes.value[val[4]] || 0;
    // let _second = seconds.value[val[5]] || 0;
    // console.log(4455,_hour,_minute)
    // const selectTimeStamp = new Date(_year, _month, _day, _hour, _minute, _second).getTime();
    
    if(props.dateChecked){
      emit('resetDate')
    }
    
    // if(timeStamp >= selectTimeStamp && !props.dateChecked) {
    //   Taro.showToast({
    //     title: '结束时间必须晚于起始时间',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   e.detail.value = [...value.value]
      
    //   return;
    // }
  }
  
  resultValue.value = val;
  year.value = years.value[val[0]] || 0;
  month.value = months.value[val[1]] || 0;
  day.value = days.value[val[2]] || 0;
  hour.value = hours.value[val[3]] || 0;
  minute.value = minutes.value[val[4]] || 0;
  second.value = seconds.value[val[5]] || 0;

  setDays(year.value, month.value, day.value, hour.value, minute.value, second.value);
};

const pushItemIntoMinutes = (currSelectHour) => {
  if(currSelectHour === baseHourStart){
    console.log('范围内的起始hour')
    for (let j = baseMinuteStart; j < 60; j++) {
      MINUTES.push(j);
    }
  } else if (currSelectHour === baseHourEnd) {
    console.log('范围内的结束hour')
    for (let j = 0; j < baseMinuteEnd; j++) {
      MINUTES.push(j);
    }
  } else {
    console.log('其它hour')
    for (let j = 0; j < 60; j++) {
      MINUTES.push(j);
    }
  }
}

const onCancellClick = (e: any) => {
  e.preventDefault();
  emit("datePickerCancellEvent");
};

const onOkClick = () => {
  const myEventDetail: {
    data: any
    date: number        // 时间戳
    dateLis: number[]   // 年月日时分秒
    fullDate: string   // 年月日时分
  } = {
    data: {},
    date: 0,
    dateLis: [],
    fullDate: ''
  };

  const arr = getResultDate();
  const date = arr.slice(0, 3).join('-');
  const time = arr.slice(3, 5).join(':');
  const date_time = `${date} ${time}`
  myEventDetail.fullDate = date_time;
  myEventDetail.data = props.data;
  myEventDetail.date = new Date(date_time).getTime();
  // myEventDetail.dateLis = arr;

  emit("datePickerOkEvent", myEventDetail);
};

watch(
  () => props.isShowDatePicker,
  () => {
    canShow.value = props.isShowDatePicker;
    // console.log('what', canShow.value, props)
    // if(props.minDate){
    //   setSubDateByMode();
    // }else{
    //   setDateByMode();
    // }
  },
  {
    immediate: true,
    deep: true
  }
);

watch(
  () => props.mode,
  () => {
    console.log('mode', props.mode, props)
    setDateByMode();
  },
  {
    immediate: true,
  }
);

watch(() => props.dateChecked, () => {
  console.log('dateChecked')
  if(!props.dateChecked){
  //   setDateByMode();
    console.log('重新set')
  }
  console.log(day.value,hour.value)
},
  {
    immediate: true,
  })
</script>

<style lang="less">
@import url("./index.less");
</style>
./date