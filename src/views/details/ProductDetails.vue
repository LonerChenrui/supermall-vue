<template>
  <div class="productDetails">
    <product-details-navBar/>
    <product-details-swipet :topImages="topImages"/>
     <detail-base-info :goods="goods" />
     <detail-shop-info :shop="shops"/>
     <detail-images-info :imagesInfo="detailsInfo"/>
     <detail-param-info :paramInfo="paramsInfo"/>
     <detail-comment-info :commentInfo="commentInfo"/>
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



import { getProductDetail,Goods,Shop,GoodsParams } from '@/network/productDetails'
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
      commentInfo: {}
    }
  },
  props:{ 
    
  },
  components:{ 
    ProductDetailsNavBar,
    ProductDetailsSwipet,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo
  },
  created() {
    // 获取详情页的iid
    this.detailsId = this.$route.query.iid;
    this.getProductDetail();
  },
  methods: {
    getProductDetail() {
      getProductDetail(this.detailsId)
      .then((res) => {
        let data = res.result;
        console.log(data)

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
        console.log(this.goods)

      })
    }
  },
}
</script>
<style scoped lang="scss">

</style>