// 起始、结束时间控制器
// 8:30 - 18:00
export const baseHourStart = 8;
export const baseHourEnd = 18;
export const baseMinuteStart = 30;
export const baseMinuteEnd = 0;
// 用于调试
// export const baseHourStart = 6;
// export const baseHourEnd = 21;
// export const baseMinuteStart = 30;
// export const baseMinuteEnd = 0;

export const ROWS = [
  {
    label: '开始时间',
    prop: 'stime',
    comp_type: 'datetime-picker',
    required: true,
    date_type: 'datetime',
    data: {
      type: "YMDhm"
    },
    visible: false,
    date: null,
    placeholder: '请选择开始时间',
    date_checked: 'etime'
  },
  {
    label: '结束时间',
    prop: 'etime',
    comp_type: 'datetime-picker',
    required: true,
    date_type: 'datetime',
    data: {
      type: "YMDhm"
    },
    visible: false,
    date: null,
    placeholder: '请选择结束时间',
    disabled: true  // 默认为不可选，当选择了开始时间才启用
  }
]

export const RULES = {
  stime: [
    { required: true, message: '开始时间不能为空' },
  ],
  etime: [
    { required: true, message: '结束时间不能为空' },
  ],
}