<template>
  <div class="login">
    <!-- 标题栏 -->
    <nav-bar  class="loginNavBar">
      <template #nav-content>
        <div class="navbarTitle">登录</div>
      </template>
    </nav-bar>
    <div class="login-item" :class="{error: !formData.username}" >
      <label for="username">用户名：</label>
      <input id="username" placeholder="请输入用户名" type="text" v-model="formData.username"/>
    </div>
    <div class="login-item" :class="{error: !formData.password}">
      <label for="password">密码：</label>
      <input id="password" placeholder="请输入密码" type="password" v-model="formData.password"/>
    </div>
    <div class="login-btn">
      <van-button class="login-btn-login" type="info" @click="goLogin">
        点击登录
      </van-button>
      <van-button class="login-btn-register" plain type="info" @click="goRegister()">
        立即注册
      </van-button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navBar/NavBar'
export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        password: "",
        login: true
      }
    };
  },
  methods: {
    goLogin() {
      if(!this.formData.username) {
        this.$notify({
          type: 'warning',
          message: '用户名不能为空',
          duration: 1000
        })
      }else if(!this.formData.password) {
        this.$notify({
          type: 'warning',
          message: '密码不能为空',
          duration: 1000
        })
      }else {
        localStorage.setItem('formData',JSON.stringify(this.formData))
        this.$notify({
          type: 'success',
          message: '模拟登录成功，跳转页面',
          duration: 1000,
          onClose: () => {
            this.$router.push('/profile')
          }
        })
      }
    },
    goRegister() {
      this.$router.push('/register')
    }
  },
  components: {
    NavBar
  },
};
</script>

<style scoped>
.login {
  font-size: 14px;
  width: 100%;
  color: #333333;
}

.login-nav {
  color: white;
  background-color: #ff8198;
}

.login-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 340px;
  margin: 30px auto;
}

.login-item label {
  font-size: 16px;
  display: block;
  width: 70px;
}

.login-item input {
  font-size: 14px;
  line-height: 36px;
  display: block;
  width: 270px;
  height: 36px;
  padding-left: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  outline: none;
  background: none;
}

.login-item input:focus {
  border: 1px solid #4098ef;
}

.login-item.error input:focus {
  border: 1px solid red;
}

.login-item input::placeholder {
  color: #999999;
}

.login-btn {
  display: flex;
  justify-content: space-between;
  width: 340px;
  margin: 0 auto;
}
.loginNavBar {
  background-color: #ff8198;
  text-align: center;
  line-height: 44px;
}
.navbarTitle {
  color: #fff;
}
</style>
