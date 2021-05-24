<template>
  <div class="login-container">
    <vue-particle-line>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <h3 class="title">
          {{systemName}}
        </h3>
        <el-form-item prop="userName">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="loginForm.user_name" name="user_name" type="text" auto-complete="on" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="loginForm.password"
            :type="pwdType"
            name="password"
            auto-complete="on"
            placeholder="密码"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <!-- <el-form-item prop="captchaInput">
          <span class="svg-container">
            <svg-icon icon-class="captcha" />
          </span>
          <el-input
            v-model="loginForm.captcha_input"
            class="captcha-input"
            name="cpatcha_input"
            auto-complete="on"
            placeholder="验证码"
            @keyup.enter.native="handleLogin"
          />
          <span @click="replaceCaptcha">
            <img :src="'data:image/png;base64,' + captchaBase64Img" class="captcha-img">
          </span>
        </el-form-item> -->
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </vue-particle-line>
  </div>
</template>

<script>

import { getCaptcha } from '@/api/system/login'

export default {
  name: 'Login',
  data() {
    const validatePass = (rule, value, callback) => {
      // if (value.length < 5) {
      //   callback(new Error('密码不能小于5位'))
      // } else {
      //   callback()
      // }
      callback()
    }
    return {
      loginForm: {
        user_name: '',
        password: '',
        captch_input: '',
        captcha_token: '',
        is_campus:1
      },
      captchaBase64Img: '',
      loginRules: {
        user_name: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass, message: '请输入密码' }],
        captcha_input: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      systemName: process.env.VUE_APP_SYSTEM_NAME
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // this.replaceCaptcha()
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.loginForm.user_name.trim()
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' }) //  this.redirect ||

          }).catch(() => {
            this.loading = false
            // this.replaceCaptcha()
          })
        } else {
          return false
        }
      })
    },
    // replaceCaptcha() {
    //   getCaptcha().then(res => {
    //     this.loginForm.captcha_token = res.data.captcha_token
    //     this.captchaBase64Img = res.data.captcha_base64_img
    //   })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .captcha-input {
    width: 40%
  }
  .captcha-img {
    float: right;
    height: 100%;
  }
}
</style>
