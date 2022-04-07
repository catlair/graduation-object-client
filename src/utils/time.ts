/** 根据当前时间，进行问候 */
export function getGreeting(name: string = '老师') {
  const now = new Date(),
    hour = now.getHours();
  if (hour < 6) {
    return `晚安，${name}，月亮会给你黑的！`;
  } else if (hour < 9) {
    return `早上好，${name}，早起的鸟儿有虫吃噢！`;
  } else if (hour < 12) {
    return `上午好，${name}，工作顺利嘛！`;
  } else if (hour < 14) {
    return `中午了，${name}，吃了么？`;
  } else if (hour < 17) {
    return `下午好，${name}，祝你开心每一天！`;
  } else if (hour < 19) {
    return `傍晚了，${name}，在等待什么呢？`;
  } else if (hour < 22) {
    return `晚上好，${name}，今天过得怎么样？`;
  }
  return `夜深了，${name},早点休息吧！`;
}

/**
 * sort by time
 */
export function sortByTimeString(a: Date | string, b: Date | string) {
  return new Date(a).getTime() - new Date(b).getTime();
}
