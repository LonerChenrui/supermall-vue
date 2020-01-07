<template>
  <div class="profile">
    <p @click="add">我的</p>
  </div>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      name: '张',
      list: [
        {name: false},
        {name: false},
        {name: false},
      ]
    }
  },
  beforeCreate() {
    
  },
  methods: {
    add() {
      this.list = this.list.map((item)=>{
        item.name = true;
        // return item
      })
      console.log(this.list)
    }
  },
  mounted() {
    
  },
  components:{ },
  props:{ },
}
</script>
<style scoped>
</style>