<template>
  <div class="profile">
    <nav-bar class="profileNavBar">
      <template #nav-content>
        <div class="NavBar-title">小码哥商城</div>
      </template>
    </nav-bar>

    <scroll class="scroll" :probeType=3>
      <login ref="login" :isLogin="isLogin" :formData="formData"/>

      <money/>

      <div class="line"></div>

      <profile-list/>
      
    </scroll>
    
  </div>
</template>

<script>
import NavBar from '@/components/common/navBar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'
import Login from './children/Login'
import Money from './children/Money'
import ProfileList from './children/ProfileList'

export default {
  name: "profile",
  data() {
    return {
      isLogin: false,
      formData: {}
    }
  },
  components:{ 
    NavBar,
    Scroll,
    Login,
    Money,
    ProfileList
  },
  props:{ },
  methods: {
  
  },
  mounted() {
    
  },
  activated() {
    let userPic = JSON.parse(localStorage.getItem('user_pic'))
    let formData = JSON.parse(localStorage.getItem('formData'))
    if(formData) {
      this.isLogin = formData.login;
      this.formData = formData
    }
    if(userPic) {
      this.$refs.login.defaultPic = userPic;
    }

  }
}
</script>
<style lang="scss" scoped>
.profileNavBar {
  background-color: #ff8198;
  text-align: center;
  line-height: 44px;
}

.NavBar-title {
    color: #fff;
    font-weight: 600;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}
.profile {
  width: 100%;
  height: 100%;
  position: relative;
}
.scroll {
  height: calc(100vh - 88px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>