import { showToast } from "../utils/util";

export function useDatePicker(form){

  const datePickerCancellEvent = (value) => {
    // console.log("datePickerCancellEvent", value);
    value.visible = false;
  };

  const datePickerOkEvent = (item, value, st_prop, et_prop) => {
    const { fullDate } = item;
    const selectTimeStamp = new Date(fullDate.replace(/\-/g, "/")).getTime();
    console.log("datePickerOkEvent", value);
  
    if (value.prop === st_prop) {
      const todayTimeStamp = new Date().getTime();
      console.log(selectTimeStamp, todayTimeStamp, form[et_prop])
      if (todayTimeStamp > selectTimeStamp) {
        showToast("起始时间不能早于当前时间", "none")
        return;
      }
      if (form[et_prop]) {
        const eTimeStamp = new Date(form[et_prop].replace(/\-/g, "/")).getTime();
        console.log(eTimeStamp, selectTimeStamp)
        console.log(eTimeStamp < selectTimeStamp)
        if (selectTimeStamp > eTimeStamp) {
          showToast("请重新选择结束时间", "none")
          form[et_prop] = "";
        }
      }
    }

    if (value.prop === et_prop) {
      if (form[st_prop]) {
        const timeStamp = new Date(form[st_prop].replace(/\-/g, "/")).getTime();
        if (timeStamp > selectTimeStamp) {
          showToast("结束时间不能早于起始时间", "none")
          return;
        }
      } else {
        showToast("请先选择起始时间", "none")
        return;
      }
    }

    value.visible = false;
    console.log(form[value.prop])
    if(form.fast_time_key !== undefined){
      if(form.fast_time_key !== 0){
        let last_timestamp = new Date(form[value.prop]).getTime()
        const last_fullDate = fullDate
        let this_timestamp = new Date(last_fullDate.replace(/\-/g, "/")).getTime()
        if(last_timestamp !== this_timestamp){
          form.fast_time_key = -1
          console.log('选的不同，清空')
        }
      }
    }
    form[value.prop] = fullDate

    console.log('datePickerOkEvent 完成',form,value.prop,fullDate)
  };

  return {
    datePickerCancellEvent,
    datePickerOkEvent
  }
}