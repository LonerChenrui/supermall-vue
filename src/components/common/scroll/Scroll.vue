<template>
  <div class="scrollCon" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "",
  data() {
    return {
      scroll: null
    }
  },
  components:{ },
  props:{ 
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.scroll, {
      // 0和1不监听滚动事件,2监听但是不监听手指松开后的滑动距离,3全部监听
      probeType: this.probeType,
      // 是否开启监听滚动到底部事件 (列如：上拉加载更多动能）
      pullUpLoad: this.pullUpLoad,
      // 开启点击事件，默认false
      click: true,
      // 是否开启滚动
      scrollY:true
    })

    // 监听scroll滚动到底部
    this.pullUpLoad && this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp') 
    })

    // 监听scroll事件
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll',(option) => {
        this.$emit('scrollOption',option) 
      })
    }
    
  },
  methods: {
    // 用于一直触发scroll滚动到底部
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    // scrollTo回到指定滚动位置  x横坐标, y纵坐标, time回到指定位置的时间
    backTopPotion(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    // 用于重新计算scroll滚动区域高度
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // scroll的纵轴坐标 y
    scrollY() {
      return this.scroll && this.scroll.y ?  this.scroll.y : 0
    }
  },
  
}
</script>
<style scoped>
</style>