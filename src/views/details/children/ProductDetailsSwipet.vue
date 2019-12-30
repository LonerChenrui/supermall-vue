<template>
  <div class="productDetailsSwipet">
    <van-swipe :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(item,index) in topImages" :key="(index)">
        <img :src="item" alt="" @load="swiperImg">
      </van-swipe-item>  
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "productDetailsSwipet",
  data() {
    return {
      onceLoad: false
    }
  },
  components:{ },
  props:{
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    swiperImg() {
      if(this.onceLoad) {
        // this.$emit('swiperImg')
        this.onceLoad = false;
      }
    }
  },
  destroyed() {
    console('销毁')
  }
}
</script>
<style scoped lang="scss">
.productDetailsSwipet {
  width: 100%;
}

.productDetailsSwipet img {
  width: 100%;
}
.productDetailsSwipet ::v-deep .van-swipe__indicators .van-swipe__indicator{
  width: 8px;
  height: 8px;
}

.productDetailsSwipet ::v-deep .van-swipe {
  height: 200px;
}
</style>