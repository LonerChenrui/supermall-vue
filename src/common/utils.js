// 防抖函数
export function debounce(fn,time) {
  let timeOut = null;
  return function() {
    if(timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() =>{
     //  fn.apply(this,ary)
     fn()
    },time)
  }
}
