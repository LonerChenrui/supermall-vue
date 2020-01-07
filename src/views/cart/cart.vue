<template>
  <div class="cart">
    <!-- 购物车标题 -->
    <nav-bar class="cart_navBar">
      <template #nav-content>
        <div class="cart_navContent">
          <p>购物车({{cartProductLength}})</p>
        </div>
      </template>
    </nav-bar>

    <!-- 购物车列表 -->
    <scroll class="scroll" ref="scroll">
      <cart-product-list :cartListDate="cartProduct"/>
    </scroll>

    <!-- 购物车底部 -->
    <cart-bottom/>
    

  </div>
</template>

<script>
import CartProductList from '@/views/cart/children/cartProductList'
import CartBottom from '../../views/cart/children/cartProductBottom'

import navBar from '@/components/common/navBar/NavBar'
import scroll from '../../components/common/scroll/Scroll'
import { mapState, mapGetters } from 'vuex'
export default {
  name: "cart",
  data() {
    return {
      
    }
  },
  components:{
    navBar,
    CartProductList,
    scroll,
    CartBottom
  },
  props:{ },
  computed: {
    ...mapState([ 'cartProduct' ]),
    ...mapGetters(['cartProductLength'])
    
  },
  mounted() {
    
  },
}
</script>
<style scoped lang="scss">
.cart_navBar {
  background: #ff8198;
  .cart_navContent {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: #fff;
    }
  }
}
.cart {
  position: relative;
  height: 100vh;
}
.scroll {
  // height: calc(100vh - 44px - 44px);
  position: absolute;
  left: 0;
  top: 44px;
  right: 0;
  bottom: 44px;
  overflow: hidden;
  z-index: 9;
}
</style>