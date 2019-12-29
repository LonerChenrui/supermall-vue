<template>
  <div class="LonerSwiper">
    <van-swipe :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(item) in banner" :key="(item.title)">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImg">
        </a>
      </van-swipe-item>  
    </van-swipe>
  </div>
</template>

<script>


export default {
  name: "",
  data() {
    return {
      onceLoad: true
    }
  },
  components:{ },
  props:{
    banner: {
      type: Array,
      default: []
    }
  },
  methods: {
    swiperImg() {
      if(this.onceLoad) {
        this.$emit('swiperImg')
        this.onceLoad = false;
      }
      
    }
  },
}
</script>
<style scoped lang="scss">

.LonerSwiper {
  width: 100%;
}

.LonerSwiper img {
  width: 100%;
}
.LonerSwiper ::v-deep .van-swipe__indicators .van-swipe__indicator{
  width: 8px;
  height: 8px;
}

</style>
