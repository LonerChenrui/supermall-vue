<template>
  <div class="category">
    <!-- 标题 -->
    <nav-bar class="categoryNavBar">
      <template #nav-content> 
        <div class="categoryTitle">商品分类</div>
      </template>
    </nav-bar>

    <!-- 左侧分类title -->
    <scroll class="scroll_left">
      <category-left-title 
        :categoryList="categoryList" 
        @categoryLeftTitle="categoryLeftTitle"
        ref="leftTitle"
      />
    </scroll>
    
    <!-- 右侧分类内容 -->
    <scroll class="scroll_right">
      <subcategory :getSubcategoryData="getSubcategoryData"/>
      <tab-control 
        :tabControlTitles="tabControlTitles" 
        @goodsListtype="goodsListtype"
        ref="tabControl"
      />
      <goods-list :goodList="getCategoryDetailData"/>
    </scroll>

  </div>
</template>

<script>
import NavBar from '@/components/common/navBar/NavBar' 
import Scroll from '@/components/common/scroll/Scroll'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'

import CategoryLeftTitle from '@/views/category/children/CategoryLeftTitle'
import Subcategory from '@/views/category/children/Subcategory'

import {getCatetory, getSubcategory, getCategoryDetail} from '@/network/category'
export default {
  name: "category",
  data() {
    return {
      categoryList: [],
      getSubcategoryData: [],
      getCategoryDetailData: [],
      tabControlTitles: ["流行", "新款", "精选"],
    }
  },
  components:{
    NavBar,
    CategoryLeftTitle,
    Scroll,
    Subcategory,
    TabControl,
    GoodsList
  },
  props:{ 

  },
  created() {
    this.getCatetory();
  },
  methods: {
    // ##初始化数据
    getCatetory() {
      // 1.左侧分类
      getCatetory().then(res => { 
        const result = res.data.category.list;
        this.categoryList = result;
        this.$nextTick(()=>{
          this.getSubcategory(result[0].maitKey,0);
          this.getCategoryDetail(result[0].miniWallkey,'pop');
        })
      })
    },
    // 右侧上面部分
    getSubcategory(key,index) {
      getSubcategory(key).then(res => {
        this.getSubcategoryData = res.data.list;
      })
    },
     // 右侧下面部分
    getCategoryDetail(key,type) {
      getCategoryDetail(key,type).then(res => {
        this.getCategoryDetailData = res
      })
    },

    // ##切换分类展示对应数据
    categoryLeftTitle({item,index}) {
      this.$refs.tabControl.curIndex = 0;
      this.getSubcategory(item.maitKey,index);
      this.getCategoryDetail(item.miniWallkey,'pop');

    },

    // ##流行、新款、精选
    goodsListtype(index) {
      const type = ["pop", "new", "sell"];
      const curIndex = this.$refs.leftTitle.curIndex;
      this.getCategoryDetail(this.categoryList[curIndex].miniWallkey,type[index]);
    }
  }
}
</script>
<style scoped lang="scss">
.categoryNavBar {
  background-color: #ff8198;
  text-align: center;
  line-height: 44px;
}
.categoryTitle {
  color: #fff;
}
.scroll_left {
  position: absolute;
  left: 0;
  top: 44px;
  bottom: 44px;
  width: 100px;
  height: calc(100vh - 88px);
  background: #f6f6f6;
  overflow: hidden;
  //  z-index: 9;
}
.scroll_right {
  height: calc(100vh - 88px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 100px;
  right: 0;
  // z-index: 9;
  background-color: #fff;
}
</style>