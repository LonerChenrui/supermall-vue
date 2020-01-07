<template>
  <div class="productDetails">
    <product-details-navBar @navBarClick="navBarClick" ref="nav_bar"/>
    <scroll class="scroll" ref="scroll_component" :probeType="3" @scrollOption="scrollOption">
      <product-details-swipet :topImages="topImages" @swiperLoadImg="swiperLoadImg" class="scroll_postion"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shops"/>
      <detail-images-info :imagesInfo="detailsInfo" @detailsImgInfo="detailsImgInfo"/>
      <detail-param-info :paramInfo="paramsInfo" class="scroll_postion"/>
      <detail-comment-info :commentInfo="commentInfo" class="scroll_postion"/>
      <product-goods :goodList="goodList" :isRecommend="true" class="scroll_postion"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
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
import DetailBottomBar from "@/views/details/children/DetailBottomBar";

import Scroll from '@/components/common/scroll/Scroll'
import ProductGoods from '@/components/content/goods/GoodsList'

import { getProductDetail,Goods,Shop,GoodsParams,getRecommend } from '@/network/productDetails'
import { debounce } from '@/common/utils'
import { imgLoadMixin,backTopMixin } from '@/common/mixin'

import { mapActions } from 'vuex'
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
      detailsScrollY: [],
      _scrollY: 0,
      navBarIndex: 0
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
    DetailBottomBar
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
    this.$bus.$off('goodsLoadimg',this.imgMonitor)
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
    swiperLoadImg() {
      // this.imgMonitor();
      this.$refs.scroll_component.refresh();
    },
    detailsImgInfo() {
      // this.imgMonitor();
      this.$refs.scroll_component.refresh();
    },
    // scroll滚动到一定位置时back-top显示
    scrollOption(option) {
      this.isBackTop = (-option.y) > 1000;

      // 元素的offSetTop
      this.detailsScrollY = [];
      let targerEl = Array.from(document.getElementsByClassName('scroll_postion'));
      for(let i=0; i<targerEl.length; i++) {
        this.detailsScrollY.push(targerEl[i].offsetTop);
      }
      this.detailsScrollY.push(Number.MAX_VALUE);

      // 获取scroll的Y轴值
      this._scrollY = option ? (-option.y) : 0;
      for(let k=0; k<this.detailsScrollY.length - 1; k++) {
        if(this.navBarIndex !== k && this._scrollY > this.detailsScrollY[k] && this._scrollY <= this.detailsScrollY[k+1]) {
          this.navBarIndex = k
          this.$refs.nav_bar.curIndex = this.navBarIndex;
          console.log(k)
          break;
        }
      }
    },
    // 点击navBar使scroll滚动到指定位置
    navBarClick(index) {
      let targerEl = Array.from(document.getElementsByClassName('scroll_postion'));
      this.$refs.scroll_component.scrollToElement(targerEl[index],500)
    },
    addToCart() {
      // 获取购物车列表展示的数据
      const obj = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        cont: 1,
        checkout: false,
        id: this.detailsId
      };
      // 将数据传入到购物车页面
      this.$store.dispatch({
        type: 'addCartProductInfo',
        obj
      })
    },
  },
}
</script>
<style scoped lang="scss">
.productDetails {
  position: relative;
  height: 100%;
  width: 100%;
}
// 必须给scroll设定固定高度
.scroll {
  height: calc(100vh - 88px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  // bottom: 44px;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #fff;
}

</style>