<template>
  <div id="home">
    <!-- 标题栏 -->
    <nav-bar class="home_navBar">
      <template #nav-content>
        <div class="home_navBar_title">
          <span>首页</span>
        </div>
      </template>
    </nav-bar>

    <!-- tabControl用于吸顶 -->
    <tab-control 
      :tabControlTitles="tabControlTitles"
      @goodsListtype="goodsListtype"
      ref="tabControl_Cpn1"
      class="tabControlCpn"
      v-show="isTabControl"
    />

    <!-- better-scroll -->
    <scroll 
      class="scroll_content"
      ref="scroll_component"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
      :probeType="3"
      @scrollOption="scrollOption"
    >
      <!-- 轮播图 -->
      <loner-swiper 
        :banner="banner"
        @swiperImg="swiperImg"
      />

      <!-- 推荐 -->
      <loner-recommend :recommend="recommend"/>

      <!-- 本周流行 -->
      <loner-feature-view/>

      <!-- tabControl -->
      <tab-control 
        :tabControlTitles="tabControlTitles"
        @goodsListtype="goodsListtype"
        ref="tabControl_Cpn2"
        class="tabControlCpn"
      />

      <!-- 商品展示 -->
      <goods-list :goodList="currentGoodsData"/>
    </scroll>

    <!-- 回到顶部 -->
    <back-top 
      v-show="isBackTop"
      @click.native="backTopPotion"
    />
    
  </div>
</template>

<script>

import NavBar from '@/components/common/navBar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backTop/BackTop'


import LonerSwiper from '@/views/home/child/Swiper'
import LonerRecommend from '@/views/home/child/Recommend'
import LonerFeatureView from '@/views/home/child/FeatureView'

import { getHomeMultiData,getGoodsData } from '@/network/home'
import { debounce } from '@/common/utils'
import { imgLoadMixin,backTopMixin } from '@/common/mixin'

export default {
  name: "home",
  data() {
    return {
      banner:[],
      recommend: [],
      tabControlTitles: ["流行", "新款", "精选"],
      goodsList: {
        pop: {page: 0,list: []},
        new: {page: 0,list: []},
        sell: {page: 0,list: []},
      },
      currentType: 'pop',
      // isBackTop: false,
      isTabControl: false,
      TabControloffsetTop: 0,
      scrollY: 0,
    }
  },
  components:{
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    LonerSwiper,
    LonerRecommend,
    LonerFeatureView,
  },
  mixins: [ imgLoadMixin,backTopMixin ],
  props:{ 

  },
  created() {
    this.getHomeMultiData()
    this.getGoodsData('pop')
    this.getGoodsData('new')
    this.getGoodsData('sell')
  },
  mounted() {
   
  },
  methods: {
    // 获取多类数据
    getHomeMultiData() {
      getHomeMultiData()
      .then((res) => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    // 获取商品展示数据
    getGoodsData(type) {
      const page = this.goodsList[type].page + 1;
      getGoodsData(type,page)
      .then((res) => {
        this.goodsList[type].page = res.data.page
        this.goodsList[type].list.push(...res.data.list)
        this.goodsList[type].page+= 1
        // 调用finishPullUp方法可以一直上拉加载更多
        this.$refs.scroll_component.finishPullUp()
      })
    },
    goodsListtype(index) {
      switch(index) {
        case 0:
         this.currentType = 'pop'
         break
        case 1:
         this.currentType = 'new'
         break
        case 2:
         this.currentType = 'sell'
         break  
      }
      this.$refs.tabControl_Cpn1.curIndex = index;
      this.$refs.tabControl_Cpn2.curIndex = index;
      this.$refs.scroll_component.refresh();
    },
    pullingUp() {
      this.getGoodsData(this.currentType)
    },
    scrollOption(option) {
      this.isBackTop = (-option.y) > 1000;
      this.isTabControl = (-option.y) > this.TabControloffsetTop
    },
    // backTopPotion() {
    //   this.$refs.scroll_component.backTopPotion(0,0,800)
    // },
    swiperImg() {
      this.TabControloffsetTop = this.$refs.tabControl_Cpn2.$el.offsetTop
    },
  },
  // 组件进入被调用
  activated() {
    this.$refs.scroll_component.backTopPotion(0,this.scrollY ,0)

  },
  // 组件离开被调用
  deactivated() {
    this.scrollY = this.$refs.scroll_component.scrollY()
    // 取消home组件事件总线
    this.$bus.$off('Loadimg',this.imgMonitor)
  },
  computed: {
    currentGoodsData() {
      return this.goodsList[this.currentType].list
    }
  },
}
</script>

<style scoped lang="scss">
#home {
  position: relative;
  height: 100%;
}
.home_navBar {
  width: 100%;
  background: #ff8198;
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 9;

}
.home_navBar_title {
   line-height: 44px;
   text-align: center;
   color: #fff;
}

.scroll_content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
  overflow: hidden;
}
.tabControlCpn {
  position: relative;
  z-index: 9;
}
</style>