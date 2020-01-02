/**
 * 防抖函数和节流：都是用于防止某些函数被调用特别频繁，用于减轻浏览器压力，提供页面性能，避免造成页面卡顿
 * 应用场景：输入框输入内容进行验证、onScroll事件、resize事件。。。
 * 
 */

/**
 * @description 防抖：函数停止触发后，随之在设置的时间内执行一次
 * @param {需要处理的回调函数} func 
 * @param {时间} deley 
 */
export function debounce(func,deley) {
  let timeOut = null;
  return function(...args) {
    if(timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() =>{
      func.apply(this,args)
    //  func();
    },deley)
  }
}

/**
 * @description
 * 节流：让函数有节制地执行，而不是触发一次执行一次(在一定的时间内，只执行一次).
 * 通过一个开关与setTimeout结合使用 ：函数执行的前提条件是开关打开,持续触发时,持续关闭开关,等setTimeout时间到了,在将开关打开,函数就会执行
 * @param {需要处理的回调函数} func 
 * @param {时间} deley 
 */
export function throttle(func,deley) {
  // 设置开关
  let run = true;
  return function(...args) {
    // 如果开关被关闭，那么下面代码直接不执行
    if(!run) return
    // 持续执行就将开关关闭
    run = false;
    setTimeout(() => {
      func.apply(this,args);
      // 定时器到时间后，开关打开，函数将被执行
      run = true
    },deley)
   }
 }

// 时间格式化
// 使用 1.let date = new Date(value * 1000) 2.formatDate(date, "yyyy-MM-dd hh:mm")
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

