<template>
  <div class="recommend">
    <div class="recommend-nav">
      <div class="recommend-nav-item" v-for="(item) in recommend" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
    }
  },
  components:{ },
  props:{ 
    recommend: {
      type: Array,
      default: []
    }
  },
}
</script>
<style scoped lang="scss">
.recommend-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 10px solid #eee;
  .recommend-nav-item {
    padding: 10px 0 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    a {
      margin-top: 10px;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>