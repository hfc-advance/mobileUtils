/*!
 * mobiletoolss.js v1.0.3
 * (c) 2018-2018 崔海峰
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.mobiletoolss = {})));
}(this, (function (exports) { 'use strict';

  //! 判断浏览器是否支持scroll-behavior
  function isSupportSmoothScroll() {
    var isSupport = !!window.getComputedStyle(document.body).scrollBehavior;
    isSupportSmoothScroll = function isSupportSmoothScroll() {
      return isSupport;
    };
    return isSupport;
  }

  //! 必须传递参数
  function mustParam(param) {
    throw new Error(param + " are required");
  }

  //! 判断两个元素之间的距离元素的顶部，以及元素的最左边
  function EleDistanceEle() {
    var childEle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mustParam('childEle');
    var parentEle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mustParam('parentEle');

    if (!(childEle instanceof Element)) throw new Error('childEle must be Element');
    if (!(parentEle instanceof Element)) throw new Error('parentEle must be Element');
    //! 最大遍历次数(也就是DOM最大嵌套层级)
    var mustWhileExeCount = 30;
    var initExeCount = 0;
    var isSuccess = true;
    var result = {
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
  function easeVerticalScroll() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mustParam('target');
    var scrollDOM = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mustParam('scrollDOM');

    if (!(target instanceof Element)) throw new Error('target must be Element');
    if (!(scrollDOM instanceof Element)) throw new Error('scrollDOM must be Element');
    //! 原生支持
    if (isSupportSmoothScroll()) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      var distance = EleDistanceEle(target, scrollDOM);
      //! TODO: 避免出问题，设置个最大滚动次数
      var scrollCount = 30;
      var initScrollCount = 1;
      //! 是否是全局滚动
      var isBody = scrollDOM.isEqualNode(document.body);
      //! 滚动元素的最大滚动距离
      var maxScroll = isBody ? scrollDOM : scrollDOM.scrollHeight - (scrollDOM.offsetHeight || 0);
      //! 目标距离
      var targetPlace = distance.top > maxScroll ? maxScroll : distance.top;
      var _getScrollTop = function getScrollTop() {
        if (!isBody) {
          _getScrollTop = function getScrollTop() {
            return scrollDOM.scrollTop || 0;
          };
          return scrollDOM.scrollTop || 0;
        } else {
          _getScrollTop = function getScrollTop() {
            return window.pageYOffset || 0;
          };
          return window.pageYOffset || 0;
        }
      };
      //! 设置顶部的距离
      var _setScrollTop = function setScrollTop() {
        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (!isBody) {
          _setScrollTop = function setScrollTop(number3) {
            scrollDOM.scrollTop = number3;
          };
          scrollDOM.scrollTop = number;
        } else {
          if (document.body && document.body.scrollTop) {
            _setScrollTop = function setScrollTop() {
              var number1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

              document.body.scrollTop = number1;
            };
          } else if (document.documentElement && document.documentElement.scrollTop) {
            _setScrollTop = function setScrollTop(number2) {
              document.documentElement.scrollTop = number2;
            };
          }
          document.body.scrollTop = document.documentElement.scrollTop = number;
        }
      };
      //! 处理兼容性
      var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
        return setTimeout(callback, 1000 / 60);
      };
      var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
      var timer = requestAnimationFrame(function fn() {
        //! 当前相差多少
        var currentDistance = parseInt(targetPlace) - _getScrollTop();
        if (Math.abs(currentDistance) <= 1 || initScrollCount >= scrollCount) {
          _setScrollTop(targetPlace);
          cancelAnimationFrame(timer);
          initScrollCount = 1;
        } else {
          initScrollCount += 1;
          var shouldScroll = currentDistance * 0.25;
          //! TODO:小于1的时候scrollTop设置了不会触发滚动
          var shouldScrollTop = _getScrollTop() + (shouldScroll > 0 ? shouldScroll < 1 ? 1 : shouldScroll : shouldScroll > -1 ? -1 : shouldScroll);
          _setScrollTop(shouldScrollTop);
          timer = requestAnimationFrame(fn);
        }
      });
    }
  }

  var main = {
    //! 平滑滚动
    easeVerticalScroll: easeVerticalScroll,
    //! 计算两个元素之间的距离
    EleDistanceEle: EleDistanceEle
  };

  exports.easeVerticalScroll = easeVerticalScroll;
  exports.EleDistanceEle = EleDistanceEle;
  exports.default = main;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
