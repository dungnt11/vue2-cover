<template>
  <div class="login-page">
    <div class="login-form">
      <el-input
        label="Tên đăng nhập"
        placeholder="Tên đăng nhập"
        v-model="username"
        class="form-input"
      >
      </el-input>
      <el-input label="Mật khẩu" placeholder="Mật khẩu" v-model="password"  show-password class="form-input">
      </el-input>
      <el-button type="primary" class="login-button" @click="login">Đăng nhập</el-button>
    </div>
  </div>
</template>
<script>

import Api from './api'

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods:{
    login(){
        let loginData = {
            username: this.username,
            password: this.password,
        }
        Api.login(loginData).then((res) => {
            if(res.success == 1 && res.data.token){
              localStorage.setItem("adminToken", res.data.token)
              this.$router.push({name: 'users-list'})
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    .login-form {
        max-width: 300px;
        height: 300px;
        .form-input{
            margin: 10px 0px;
        }
        .login-button{
            display: block;
            margin: 0 auto;
        }
    }
}

</style>
