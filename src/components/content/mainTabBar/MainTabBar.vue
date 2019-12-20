<template>
  <div class="MainTabBar">
    <tab-bar>
      <tab-bar-Item link="/home"> 
          <template #icon-item>
           <img src="../../../assets/img/tabbar/home.svg" alt="">
          </template>
          <template #icon-item-active>
            <img src="../../../assets/img/tabbar/home_active.svg" alt="">
          </template>
          <template #icon-item-text>
            <span>首页</span>
          </template> 
      </tab-bar-Item>

      <tab-bar-Item link="/category">
          <template #icon-item>
           <img src="../../../assets/img/tabbar/category.svg" alt="">
          </template>
          <template #icon-item-active>
            <img src="../../../assets/img/tabbar/category_active.svg" alt="">
          </template>
          <template #icon-item-text>
            <span>分类</span>
          </template> 
      </tab-bar-Item>

      <tab-bar-Item link="/cart">
          <template #icon-item>
           <img src="../../../assets/img/tabbar/cart.svg" alt="">
          </template>
          <template #icon-item-active>
            <img src="../../../assets/img/tabbar/cart_active.svg" alt="">
          </template>
          <template #icon-item-text>
            <span>购物车</span>
          </template> 
      </tab-bar-Item>

      <tab-bar-Item link="/profile">
          <template #icon-item>
           <img src="../../../assets/img/tabbar/profile.svg" alt="">
          </template>
          <template #icon-item-active>
            <img src="../../../assets/img/tabbar/profile_active.svg" alt="">
          </template>
          <template #icon-item-text>
            <span>我的</span>
          </template> 
      </tab-bar-Item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from '../../common/tabBar/TabBar'
import TabBarItem from '../../common/tabBar/TabBarItem'
export default {
  name: "MainTabBar",
  data() {
    return {
    }
  },
  components:{
    TabBar,
    TabBarItem
   },
  props:{ },
}
</script>
<style scoped lang="scss">
.MainTabBar {
  width: 100%;
  height: 49px;
  position:fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f6f6f6;
  border-top: 1px solid #eee;
  box-shadow: 0px -1px 1px rgba(150,150,150,.08);
}
</style>