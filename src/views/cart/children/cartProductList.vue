<template>
  <div class="cartProductList">
    <div class="cartListItem" v-for="(item) in cartListDate" :key="item.id">
      <div class="listLeft">
        <van-checkbox 
          v-model="item.checkout" 
          checked-color="#07c160"
          @change="singleStatus"
        >
        </van-checkbox>
      </div>
      <div class="listContent">
        <img :src="item.image" alt="">
      </div>
      <div class="listRight">
        <p>{{item.title}}</p>
        <p>{{item.desc}}</p>
        <p>
          <span>￥{{item.price}}</span>
          <span>x{{item.cont}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "cartProductList",
  data() {
    return {

    }
  },
  components:{ 
    
  },
  props:{ 
    cartListDate: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    singleStatus() {
      this.$store.commit({
        type: 'singleStatus'
      })
    },
    ...mapMutations(["setCartList"])
  },
  computed: {
    
  },
  created() {
    // 取出购物车列表数据
    const list = JSON.parse(localStorage.getItem('setCartList')) || [];
    if(list) {
      this.setCartList(list);
    }
  }
}
</script>
<style scoped lang="scss">
.cartListItem {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  .listLeft {
    width: 8%;
  }
  .listContent {
    width: 20%;
    img {
      width: 70px;
      height: 100px;
      border-radius: 5px;
    }
  }
  .listRight {
    width: 72%;
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
      font-size: 14px;
    }
    :nth-child(2) {
      margin: 10px 0
    }
    :nth-child(3) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: red;
      }
    }
  }


}

</style>