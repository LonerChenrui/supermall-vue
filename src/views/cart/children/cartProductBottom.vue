<template>
  <div class="cartBottom">
    <div class="cartNavbar">
      <div>
        <van-checkbox 
          v-model="$store.state.isCheckout" 
          checked-color="#07c160" 
          @click='checkboxStatus'
        >
          全选
        </van-checkbox>
      </div>
      <div class="total">
        <span>合计：</span>
        <span>￥{{cartTotalPrice}}</span>
      </div>
      <div>
        <van-button 
          color="linear-gradient(to right, #4bb0ff, #c33)"
          round
          size="small"
          @click="submi"
        >
          提交订单( {{cartOrderNum.length}} )
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions, mapMutations } from 'vuex'
export default {
  name: "",
  data() {
    return {
      // checkout: false
    }
  },
  components:{ },
  props:{ },
  methods: {
    submi() {
      
    },
    checkboxStatus() {
      this.$store.commit({
        type: 'checkboxStatus',
        checkout: this.$store.state.isCheckout
      })
    }
  },
  computed: {
    ...mapGetters(['cartTotalPrice','cartOrderNum'])
  },
}
</script>
<style scoped lang="scss">
.cartBottom {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 44px;
  z-index: 10;
  background-color: #fff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.cartNavbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
}
.total {
  color: red;
}

</style>