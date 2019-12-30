<template>
  <div class="ProductDetailsNavBar">
    <nav-bar class="">
      <template v-slot:nav-left>
        <div class="nav_left_backImg">
          <img src="~@/assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:nav-content>
        <div class="nav_content_title">
          <span v-for="(item, index) in navbarTitle" :key="index">{{item}}</span>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navBar/NavBar'
export default {
  name: "productDetailsNavBar",
  data() {
    return {
      navbarTitle: ["商品", "参数", "评论", "推荐"]
    }
  },
  components:{ 
    NavBar
  },
  props:{ },
}
</script>
<style scoped>
.ProductDetailsNavBar {
  background: #fff;
}
.nav_left_backImg {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav_content_title {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>