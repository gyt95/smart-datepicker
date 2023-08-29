import Taro from "@tarojs/taro"

export const showToast = (text: string, icon: string | undefined = 'success', time: number = 1500) => {
  Taro.showToast({
    title: text,
    icon: icon as "success" | "error" | "loading" | "none" | undefined,
    duration: time
  })
}