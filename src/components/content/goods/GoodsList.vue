<template>
  <div class="goodsList">
    <p v-show="isRecommend">推荐商品</p>
    <div 
      class="googsListItem" 
      v-for="(item, index) in goodList" 
      :key="index"
      @click="details(item.iid)"
    >
      <div>
        <img :src="showTypeImg(index)" alt="" @load="refresh()">
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
    },
    isRecommend: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    refresh() {
      // 发射事件总线
      this.$bus.$emit('Loadimg')
      
    },
    // 点击跳转详情页
    details(iid) {
      if(iid) {
        this.$router.push({
          path: '/details',
          query: {
            iid
          }
        })
      }else {
        this.$router.go(0)
      }
    },
    // 动态显示图片
    showTypeImg(index) {
      return  this.goodList[index].img || this.goodList[index].image || this.goodList[index].show.img;
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
  p {
    width: 100%;
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
  }
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