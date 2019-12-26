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
      />

      <!-- 推荐 -->
      <loner-recommend :recommend="recommend"/>

      <!-- 本周流行 -->
      <loner-feature-view/>

      <!-- tabControl -->
      <tab-control 
        :tabControlTitles="tabControlTitles"
        @goodsListtype="goodsListtype"
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
      isBackTop: false
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
    LonerFeatureView
   },
  props:{ 

  },
  created() {
    this.getHomeMultiData()
    this.getGoodsData('pop')
    this.getGoodsData('new')
    this.getGoodsData('sell')
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
    },
    pullingUp() {
      this.getGoodsData(this.currentType)
    },
    scrollOption(option) {
      this.isBackTop = (-option.y) > 1000
    },
    backTopPotion() {
      this.$refs.scroll_component.backTopPotion(0,0,800)
    }

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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

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
</style>