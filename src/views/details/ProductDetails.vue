<template>
  <div class="productDetails">
    <product-details-navBar/>
    <scroll class="scroll" ref="scroll_component" :probeType="3" @scrollOption="scrollOption">
      <product-details-swipet :topImages="topImages" @swiperLoadImg="loadImg"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shops"/>
      <detail-images-info :imagesInfo="detailsInfo" @detailsImgInfo="loadImg"/>
      <detail-param-info :paramInfo="paramsInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <product-goods :goodList="goodList" :isRecommend="true"/>
    </scroll>
    <back-top v-show="isBackTop" @click.native="backTopPotion"/>
  </div>
</template>

<script>
import ProductDetailsNavBar from '@/views/details/children/ProductDetailsNavBar'
import ProductDetailsSwipet from '@/views/details/children/ProductDetailsSwipet'
import DetailBaseInfo from '@/views/details/children/DetailBaseInfo'
import DetailShopInfo from '@/views/details/children/DetailShopInfo'
import DetailImagesInfo from '@/views/details/children/DetailImagesInfo'
import DetailParamInfo from '@/views/details/children/DetailParamInfo'
import DetailCommentInfo from '@/views/details/children/DetailCommentInfo'
import BackTop from '@/components/content/backTop/BackTop'

import Scroll from '@/components/common/scroll/Scroll'
import ProductGoods from '@/components/content/goods/GoodsList'

import { getProductDetail,Goods,Shop,GoodsParams,getRecommend } from '@/network/productDetails'
import { debounce } from '@/common/utils'
import { imgLoadMixin,backTopMixin } from '@/common/mixin'
export default {
  name: "productDetails",
  data() {
    return {
      detailsId: '',
      topImages: [],
      goods: {},
      shops: {},
      detailsInfo: {},
      paramsInfo: {},
      commentInfo: {},
      goodList: [],
    }
  },
  mixins: [imgLoadMixin,backTopMixin],
  props:{ 
    
  },
  components:{ 
    ProductDetailsNavBar,
    ProductDetailsSwipet,
    Scroll,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    ProductGoods,
    BackTop,
  },
  created() {
    // 获取详情页的iid
    this.detailsId = this.$route.query.iid;
    
    this.getProductDetail();
    this.getRecommend()
  },
  mounted() {
    
  },
  destroyed() {
    // 取消details事件总线
    this.$bus.$off('Loadimg',this.imgMonitor)
  },
  methods: {
    // 发送网络请求
    getProductDetail() {
      getProductDetail(this.detailsId)
      .then((res) => {
        let data = res.result;
        // console.log(data)

        // 获取轮播数据
        this.topImages = res.result.itemInfo.topImages;

        // 获取商品数据,调用封装的ES6的class
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 获取店铺数据
        this.shops = new Shop(data.shopInfo);
        
        // 获取下面的图片展示数据
        this.detailsInfo = data.detailInfo;

        // 获取尺寸数据
        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);
        
        // 获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }

      })
    },
    getRecommend() {
      // 获取推荐数据
      getRecommend()
      .then((res) => {
        this.goodList = res.data.list;
      })
    },
    // 自定义事件
    loadImg() {
      this.$refs.scroll_component.refresh();
    },
    // scroll滚动到一定位置时back-top显示
    scrollOption(option) {
      this.isBackTop = (-option.y) > 1000;
    },
  },
}
</script>
<style scoped lang="scss">
.productDetails {
  position: relative;
}
// 必须给scroll设定固定高度
.scroll {
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #fff;
}

</style>