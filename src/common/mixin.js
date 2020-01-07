import { debounce } from '@/common/utils'

// 监听图片事件总线
export const imgLoadMixin = {
  data() {
    return {
      imgMonitor: null
    }
  },
  mounted() {
    // 防抖函数,用于减少图片监听时频繁调用refresh
    const refresh = debounce(this.$refs.scroll_component.refresh,500);
     // 监听事件总线
    this.imgMonitor = () => { 
      refresh()
    }
    this.$bus.$on('goodsLoadimg',this.imgMonitor)
  }
}

// 回到底部
export const backTopMixin = {
  data() {
    return {
      // 当前滚动的位置
      isBackTop: false,
    }
  },
  methods: {
    backTopPotion() {
      this.$refs.scroll_component.backTopPotion(0,0,800)
    },
  },
}