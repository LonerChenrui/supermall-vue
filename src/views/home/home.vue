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

  </div>
</template>

<script>
import NavBar from '@/components/common/navBar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'


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
      currentType: 'pop'
    }
  },
  components:{
    NavBar,
    TabControl,
    GoodsList,
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
        console.log(res)
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
.home_navBar {
  width: 100%;
  background: #ff8198;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9;

}
.home_navBar_title {
   line-height: 44px;
   text-align: center;
   color: #fff;
}

</style>