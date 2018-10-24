/*!
 * mobiletools.js v1.0.0
 * (c) 2018-2018 
 * Released under the MIT License.
 */
'use strict';

//! 判断浏览器是否支持scroll-behavior
function isSupportSmoothScroll() {
  let isSupport = !!window.getComputedStyle(document.body).scrollBehavior;
  isSupportSmoothScroll = () => isSupport;
  return isSupport;
}

//! 必须传递参数
function mustParam(param) {
  throw new Error(`${param} are required`);
}

//! 判断两个元素之间的距离元素的顶部，以及元素的最左边
function EleDistanceEle(childEle = mustParam('childEle'), parentEle = mustParam('parentEle')) {
  if (!(childEle instanceof Element)) throw new Error(`childEle must be Element`);
  if (!(parentEle instanceof Element)) throw new Error(`parentEle must be Element`);
  //! 最大遍历次数(也就是DOM最大嵌套层级)
  let mustWhileExeCount = 30;
  let initExeCount = 0;
  let isSuccess = true;
  let result = {
    top: 0,
    left: 0
  };
  while (initExeCount <= mustWhileExeCount && childEle.offsetParent && !childEle.isEqualNode(parentEle)) {
    result.top += childEle.offsetTop;
    result.left += childEle.offsetLeft;
    childEle = childEle.offsetParent;
    initExeCount += 1;
    if (initExeCount >= mustWhileExeCount) isSuccess = false;
  }
  if (!isSuccess) throw new Error('parentEle must be childEle parent Element or Element Level too deep');
  return result;
}

//! 带有缓动效果的滚动
function easeVerticalScroll(target = mustParam('target'), scrollDOM = mustParam('scrollDOM')) {
  if (!(target instanceof Element)) throw new Error(`target must be Element`);
  if (!(scrollDOM instanceof Element)) throw new Error(`scrollDOM must be Element`);
  //! 原生支持
  if (isSupportSmoothScroll()) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    let distance = EleDistanceEle(target, scrollDOM);
    //! TODO: 避免出问题，设置个最大滚动次数
    let scrollCount = 30;
    let initScrollCount = 1;
    //! 是否是全局滚动
    let isBody = scrollDOM.isEqualNode(document.body);
    //! 滚动元素的最大滚动距离
    let maxScroll = isBody ? scrollDOM : scrollDOM.scrollHeight - (scrollDOM.offsetHeight || 0);
    //! 目标距离
    let targetPlace = distance.top > maxScroll ? maxScroll : distance.top;
    let getScrollTop = () => {
      if (!isBody) {
        getScrollTop = () => {
          return scrollDOM.scrollTop || 0;
        };
        return scrollDOM.scrollTop || 0;
      } else {
        getScrollTop = () => {
          return window.pageYOffset || 0;
        };
        return window.pageYOffset || 0;
      }
    };
    //! 设置顶部的距离
    let setScrollTop = (number = 0) => {
      if (!isBody) {
        setScrollTop = number3 => {
          scrollDOM.scrollTop = number3;
        };
        scrollDOM.scrollTop = number;
      } else {
        if (document.body && document.body.scrollTop) {
          setScrollTop = (number1 = 0) => {
            document.body.scrollTop = number1;
          };
        } else if (document.documentElement && document.documentElement.scrollTop) {
          setScrollTop = number2 => {
            document.documentElement.scrollTop = number2;
          };
        }
        document.body.scrollTop = document.documentElement.scrollTop = number;
      }
    };
    //! 处理兼容性
    let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
      return setTimeout(callback, 1000 / 60);
    };
    let cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
    let timer = requestAnimationFrame(function fn() {
      //! 当前相差多少
      let currentDistance = parseInt(targetPlace) - getScrollTop();
      if (Math.abs(currentDistance) <= 1 || initScrollCount >= scrollCount) {
        setScrollTop(targetPlace);
        cancelAnimationFrame(timer);
        initScrollCount = 1;
      } else {
        initScrollCount += 1;
        let shouldScroll = currentDistance * 0.25;
        //! TODO:小于1的时候scrollTop设置了不会触发滚动
        let shouldScrollTop = getScrollTop() + (shouldScroll > 0 ? shouldScroll < 1 ? 1 : shouldScroll : shouldScroll > -1 ? -1 : shouldScroll);
        setScrollTop(shouldScrollTop);
        timer = requestAnimationFrame(fn);
      }
    });
  }
}

var main = {
  //! 平滑滚动
  easeVerticalScroll,
  //! 计算两个元素之间的距离
  EleDistanceEle
};

module.exports = main;
