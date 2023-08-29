const isInSpecifiedTime = (baseHourStart, baseHourEnd, baseMinuteStart, baseMinuteEnd) => {
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
const getFinalMinute = (step = 5) => {
  let minutes = new Date().getMinutes();
  minutes = (minutes + step) % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  console.log('getFinalMinute',formattedMinutes,Number(formattedMinutes)); // 输出 '04'
  return Number(formattedMinutes)
}

function formatNumber(n: number) {
  let tmp = n.toString()
  return tmp[1] ? tmp : '0' + tmp
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr: string[] = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear().toString());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatLongTime(longTime, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr: string[] = [];

  var date = new Date();
  date.setTime(longTime);
  returnArr.push(date.getFullYear().toString());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const getTimeStamp = function(){

  var date = new Date();
 
 var timestamp = date.getTime();

  return timestamp;

}
//ymd  YYYY-MM-DD
const getTimeStampFromYearMonthDay = function (ymd, _spliter) {
  var str =ymd;
  // 转换日期格式
  str = str.replace(/spliter/g, '/'); // "2010/08/01";
  // 创建日期对象
  var date = new Date(str);

  date.setDate(date.getDate());

  var timestamp = date.getTime()-8*60*60*1000;

  return timestamp;

}

const getCurrentYearMonthDayTimeStamp = function () {
  let cDate= new Date();
  var str = `${cDate.getFullYear()}/${cDate.getMonth()+1}/${cDate.getDate()}`;
  
  // 创建日期对象
  var date = new Date(str);

  date.setDate(date.getDate());

  var timestamp = date.getTime() - 8 * 60 * 60 * 1000;

  return timestamp;

}

const getFutureThreeDays = function () {
  let cDate= new Date();
  cDate.setDate(cDate.getDate() + 1); // 明天的日期
  let futureDays: number[] = [];
  for (let i = 0; i < 3; i++) {
    var str = `${cDate.getFullYear()}/${cDate.getMonth()+1}/${cDate.getDate()}`;
    let date = new Date(str);
    date.setDate(date.getDate());
    let timestamp = date.getTime() - 8 * 60 * 60 * 1000;
    futureDays.push(timestamp);
    cDate.setDate(cDate.getDate() + 1); // 下一天的日期
  }
  return futureDays;
}

const getYear = function (longTime) {

  var date = new Date();
  date.setTime(longTime);
  const year = date.getFullYear()
 
  return year
}

const getMonth = function (longTime) {

  var date = new Date();
  date.setTime(longTime);
  const month = date.getMonth() + 1

  return month
}

const getDay = function (longTime) {

  var date = new Date();
  date.setTime(longTime);

  const day = date.getDate()


  return day
}

const getHour = function (longTime) {

  var date = new Date();
  date.setTime(longTime);

  const hour = date.getHours()


  return hour
}

const getMinute = function (longTime) {

  var date = new Date();
  date.setTime(longTime);

  const minute = date.getMinutes()

  return minute
}

const getSecond = function (longTime) {

  var date = new Date();
  date.setTime(longTime);

  const second = date.getSeconds()

  return second
}
//month 从1开始
function getDaysOfMonthInYear(year,month) {
  let days = [31, 28, 31,30,31,30,31,31,30,31,30,31]
  if ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)) {
    days[1] = 29
  }

  return days[month-1];
}
//month 从1开始
function getDaysOfMonth(year,month) {
  let days = new Date(year, month, 0).getDate();

  return days;
}

const formatYearMonthDay = function (longTime, spliter) {

  var date = new Date();
  date.setTime(longTime);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(spliter)
}

const formatHourMinite = function (longTime, spliter) {

  var date = new Date();
  date.setTime(longTime);
  const hour = date.getHours()
  const minute = date.getMinutes()
  // const second = date.getSeconds()

  return [hour, minute].map(formatNumber).join(spliter)
}

function getWeekStartDateByLongDate(timeStamp) {

  var time = new Date();
  time.setTime(timeStamp);

  var nowYear = time.getFullYear();
  var nowMonth = time.getMonth();
  var nowDay = time.getDate();
  var nowDayOfWeek = time.getDay();
  var date = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
  return Date.parse(date.toString())
  // return formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1));
}
function getWeekEndDateByLongDatedate(timeStamp) {
  var time = new Date();
  time.setTime(timeStamp);

  var nowYear = time.getFullYear();
  var nowMonth = time.getMonth();
  var nowDay = time.getDate();
  var nowDayOfWeek = time.getDay();

  var date = new Date(nowYear, nowMonth, nowDay + (8 - nowDayOfWeek));
  return Date.parse(date.toString())
  // return formatDate(new Date(nowYear, nowMonth, nowDay +(8 - nowDayOfWeek)));
}

function getWeekStartDate() {
  var nowYear = new Date().getFullYear();
  var nowMonth = new Date().getMonth();
  var nowDay = new Date().getDate();
  var nowDayOfWeek = new Date().getDay();
  var date = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
  return Date.parse(date.toString())
  // return formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1));
}
function getWeekEndDate() {
  var nowYear = new Date().getFullYear();
  var nowMonth = new Date().getMonth();
  var nowDay = new Date().getDate();
  var nowDayOfWeek = new Date().getDay();
  var date = new Date(nowYear, nowMonth, nowDay + (8 - nowDayOfWeek));
  return Date.parse(date.toString())
  // return formatDate(new Date(nowYear, nowMonth, nowDay +(8 - nowDayOfWeek)));
}
function formatDate(date) {
  let myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  return [myyear, mymonth, myweekday].map(formatNumber).join('-');
}
function formatStringToNumber(n) {
  n = n.toString();

if(n.length>=2){

  if (n[0]=='0'){

    return n.substr(1);
  }else{
    return n;
  }

}else{

  return n;
}

}
//汉字的日期和时间转成long时间
const getLongTimeWithDateAndTime = function (date, dateSpliter, time, timeSpliter){

var timeStamp = 0;

timeStamp = getTimeStampFromYearMonthDay(date, dateSpliter);

 if (time){

   var tA = time.split(timeSpliter);

   if(tA.length==2){

     var hour = tA[0];

     var h = formatStringToNumber(hour);

     timeStamp+=h*60*60*1000;

     var minu = tA[1];

     var m = formatStringToNumber(minu);

     timeStamp += m * 60 * 1000;
   }

  }

 return timeStamp;

}

// function getDates(days, todate = getCurrentMonthFirst()) {//todate默认参数是当前日期，可以传入对应时间
//   var dateArry = [];
//   for (var i = 0; i < days; i++) {
//     var dateObj = dateLater(todate, i);
//     dateArry.push(dateObj)
//   }
//   return dateArry;
// }
/**
   * 传入时间后几天
   * param：传入时间：dates:"2018-04-02",later:往后多少天
   */
function dateLater(dates, later) {
  let dateObj = {
    year: 2023,
    month: '',
    day: '',
    week: ''
  };
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  dateObj.year = date.getFullYear();
  dateObj.month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)).toString();
  dateObj.day = (date.getDate() < 10 ? ("0" + date.getDate()) : (date.getDate())).toString();
  dateObj.week = show_day[day];
  return dateObj;
}
function getCurrentMonthFirst() {
  var date = new Date();
  var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  return todate;
}

export default {
  formatNumber,
  formatTime: formatTime,
  formatLongTime: formatLongTime,
  getTimeStamp: getTimeStamp,
  formatYearMonthDay: formatYearMonthDay,
  formatHourMinite: formatHourMinite,
  getTimeStampFromYearMonthDay: getTimeStampFromYearMonthDay,
  getWeekStartDate: getWeekStartDate,
  formatDate: formatDate,
  getWeekEndDate: getWeekEndDate,
  getLongTimeWithDateAndTime: getLongTimeWithDateAndTime,
  getYear: getYear,
  getMonth:getMonth,
  getDay:getDay,
  getHour:getHour,
  getMinute: getMinute,
  getSecond: getSecond,
  // getDates: getDates,
  dateLater: dateLater,
  getWeekStartDateByLongDate: getWeekStartDateByLongDate,
  getWeekEndDateByLongDatedate: getWeekEndDateByLongDatedate,
  getCurrentYearMonthDayTimeStamp: getCurrentYearMonthDayTimeStamp,
  getDaysOfMonthInYear,
  getDaysOfMonth,
  getCurrentMonthFirst,
  getFutureThreeDays,
  getFinalMinute,
  isInSpecifiedTime,
}