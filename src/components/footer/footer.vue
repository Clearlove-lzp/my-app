<template lang='pug'>
  div.indexAndServerFooter
    .companyInfo
      .left
        .aboutTitle 关于哲寻
        .aboutInfo 上海哲寻信息科技有限公司（简称：哲寻科技）是中国领先的高校公共管理和思想政治模拟实践教学整体解决方案提供商
      .middle
        p.tel
          span 电话&nbsp;:&nbsp;
          span 400-188-2010
        p.email
          span 邮箱&nbsp;:&nbsp;
          span find_soft@163.com
        p.address
          span 上海总部&nbsp;:&nbsp;
          span 上海市长江南路180号长江软件园5F
        p
          span 北京分公司&nbsp;:&nbsp;
          span 北京市丰台区海鹰路5号赛欧广场2F
      .right
        .QRCode
          img(src="../../assets/footer/qrcode_1280.jpg")
        .follow 关注微信公众号
    .copyRight CopyRight&nbsp;&copy;&nbsp;2019&nbsp;上海哲寻信息科技有限公司&nbsp;沪公网安备31011302004051号&nbsp;&nbsp;【沪ICP备17030898号】
</template>

<script>
export default {
  name: "indexAndServerFooter",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='stylus'>
.indexAndServerFooter
  width 100%
  padding 0 6vw
  // background rgba(57,60,73,1)
  background #6ac6ec
  box-shadow 0px -1px 0px 0px rgba(255,255,255,0.2)
  .companyInfo
    max-width 1200px
    margin 0 auto
    border-bottom 1px solid rgba(128,128,128,1)
    overflow hidden
    font-size 14px !important
    font-family MicrosoftYaHeiUI
    color rgba(255,255,255,0.8)
    padding 48px 0 29px 0
    div
      float left
    .left
      width 50%
      height 100%
      padding-right 60px
      box-sizing border-box
      .aboutTitle
        margin-bottom 13px
        font-size 18px
      .aboutInfo
        line-height 25px
    .middle
      width 37%
      height 100%
      p
        padding-left 57px
        box-sizing border-box
        line-height 43px
        position relative
        &::before
          content ''
          display block
          width 19px
          height 19px
          position absolute
          top 21px
          left 28px
      .tel
        &::before
          margin-top -9px
          margin-left -9px
          background-image url('../../assets/footer/Bitmap.png')
      .email
        &::before
          width 20px
          height 15px
          margin-top -7px
          margin-left -10px
          background-image url('../../assets/footer/email.png')
      .address
        &::before
          width 18px
          height 23px
          margin-top -11px
          margin-left -9px
          background-image url('../../assets/footer/address.png')
    .right
      width 13%
      height 100%
      .QRCode
        width 100%
        height 97px
        text-align right
        // padding-right 4px
        margin-bottom 16px
        img
          width 97px
          height 100%
      .follow
        width 100%
        text-align right
        // padding-right 5px
  .copyRight
    font-size 14px
    // height 59px
    line-height 59px
    text-align center
    font-family MicrosoftYaHeiUI
    color rgba(128,128,128,1)
@media screen and (max-width: 997px)
  .indexAndServerFooter
    width 100%
    font-family MicrosoftYaHeiUI
    color rgba(255,255,255,1)
    padding 0 15px
    .companyInfo
      width 100%
      padding 12px
      div
        width 100% !important
      .left
        width 100% !important
        padding-right 0
        .aboutTitle
          font-size 16px
          width 100%
          margin-bottom 25px
          display block
        .aboutInfo
          font-size 12px
          width 100%
      .middle
        margin-top 25px
        p
          font-size 12px
          padding-left 40px
          &::before
            left 0
            margin-left 0 !important
      .right
        .QRCode
          margin-top 25px
          text-align center
        .follow
          font-size 12px
          text-align center
          margin-bottom 30px
    .copyRight
      width 100%
      line-height 24px
      padding 10px 0
</style>
