<template lang='pug'>
  .login
    .main
      .title
        .title-wrap
          img.logo(src='@/assets/header/znlogo.jpg')
          span.company 中诺物业网站后台
      .form
        .user
          span 用户名：
          Input.i-user.i-login(v-model='user')
        .pwd
          span 密码：
          Input.i-pwd.i-login(v-model='pwd' type='password')
        Button.btn(@click='loginUp' :loading="loading") 登录
        //- span.forget-pwd 忘记密码？
</template>

<script>
import { loginUser } from '@/api/index'

export default {
  name: "",
  data() {
    return {
      user: "",
      pwd: "",
      loading: false
    };
  },
  methods: {
    loginUp() {
      if(!this.user) {
        return this.$Message.error("请填写用户名")
      }
      if(!this.pwd) {
        return this.$Message.error("请填写密码")
      }
      let params = {
        user: this.user,
        pwd: this.pwd
      }
      this.loading = true;
      loginUser(params).then(res => {
        this.loading = false;
        if(res.data.code === 200) {
          this.$Message.success("登录成功")
          this.$router.push({
            path: '/admin'
          })
        }else {
          this.$Message.error(res.data.msg)
        }
      })
    }
  }
};
</script>

<style lang='stylus'>
.login
  position relative
  width 100vw
  height 100vh
  color #000
  background linear-gradient(rgba(51, 51, 51, 1) 50%, rgba(239, 239, 239, 1) 50%)
  .main
    position absolute
    width 562px
    height 374px
    margin auto
    top 0
    bottom 0
    left 0
    right 0
    .title
      width 100%
      height 58px
      .title-wrap
        width 63%
        margin 0 auto
        text-align center
        .logo
          padding 10px 20px
          width 78px
          height 58px
          box-sizing border-box
          background-size contain
        .company
          height 58px
          line-height 58px
          font-family '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑'
          font-weight 700
          font-style normal
          font-size 28px
          color #FFFFFF
          vertical-align top
    .form
      position relative
      height 316px
      background #FFF
      padding 50px 75px
      .user, .pwd
        margin auto
        &:after
          content ''
          display table
          clear both
        span
          display inline-block
          float left
          line-height 39px
          font-family '微软雅黑'
          font-weight 400
          font-style normal
          font-size 16px
          color #666666
        .i-login
          width 317px
          height 39px
          float right
          line-height 39px
      .pwd
        margin-top 25px
      .btn
        width 197px
        height 48px
        margin-top 45px
        margin-left 155px
        background-color rgba(51, 51, 51, 1)
        color #FFF
        font-family '微软雅黑'
        font-weight 400
        font-style normal
        font-size 16px
      .forget-pwd
        position absolute
        bottom 35px
        right 45px
</style>
