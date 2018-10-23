//! 判断浏览器是否支持scroll-behavior
export function isSupportSmoothScroll () {
  let isSupport = !!window.getComputedStyle(document.body).scrollBehavior
  isSupportSmoothScroll = () => isSupport
  return isSupport
}

//! 必须传递参数
export function mustParam (param) {
  throw new Error(`${param} are required`)
}
