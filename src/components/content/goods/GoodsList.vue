<template>
  <div class="goodsList">
    <div class="googsListItem" v-for="(item, index) in goodList" :key="index">
      <div>
        <img :src="item.show.img" alt="" @load="refresh()">
      </div>
      <p class="title">{{item.title}}</p>
      <div class="googsListItem_bottom">
        <span class="price">{{'￥' + item.price}}</span>
        <img class="cfavImg" src="~@/assets/img/common/collect.svg" alt="">
        <span class="cfav">{{item.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsList",
  data() {
    return {
    }
  },
  components:{

  },
  props:{ 
    goodList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    refresh() {
      // 发射事件总线
      this.$bus.$emit('loadimg')
    }
  },
}
</script>
<style scoped lang="scss">
.goodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  .googsListItem {
    width: 49%;
    padding: 3px;
    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    img {
      width: 100%
    }
    .googsListItem_bottom {
      display: flex;
      align-items: center;
      .price {
        color: red;
      }
      .cfavImg {
        width: 40px;
        height: 40px;
        padding: 0 10px;
      }
    }
  }
}
</style>