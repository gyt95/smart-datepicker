import { baseHourStart, baseMinuteStart, baseHourEnd, baseMinuteEnd } from "../../constants";

export const isBetweenOfficeHours = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), baseHourStart, baseMinuteStart);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), baseHourEnd, baseMinuteEnd);

  return now >= start && now <= end;
}

/**
 * 使用取模运算符（%）来将分钟数限制在0到59的范围内
 * 使用padStart()方法将分钟数格式化为两位数
 * 如果分钟数只有一位数，则在前面添加一个零
 * @param step 分钟的跨度
 */
export const getFinalMinute = (step = 5) => {
  let minutes = new Date().getMinutes();
  minutes = (minutes + step) % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  console.log('getFinalMinute',formattedMinutes,Number(formattedMinutes)); // 输出 '04'
  return Number(formattedMinutes)
}