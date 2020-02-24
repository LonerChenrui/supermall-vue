<template>
  <div class="categoryLeftTitle">
    <div v-for="(item,index) in categoryList" :key="(item.title)">
      <div class="title-itme" :class="curIndex === index ? 'active': '' ">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoryLeftTitle",
  data() {
    return {
      curIndex: 0
    }
  },
  components:{ },
  props:{
    categoryList: {
      type: Array,
      default() {
        return {}
      }
    }
  },
}
</script>
<style scoped lang="scss">
.categoryLeftTitle {
  display: flex;
  flex-direction: column;
}
.title-itme {
  width: 100px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  
}
.active {
  border-left: 3px solid #ff8198;
  box-sizing: border-box;
  background: #fff;
}
</style>