<!-- 首页 -->
<template lang="pug">
  <div class="homePage">
    carousel
    .productCenter.moduleItem
      .content
        .title 
          span 案例
          span(style="color: #d28f2c") 展示
        .line
        .productTabs
          .productTabsItem
            //- Button(v-for="(c, index) of categoryList" :type="categoryIndex === index ? 'primary' : 'default'" @click="changeProductView(index)") {{c.name}}
        .productsView
          .productItem(v-for="(p, index) of productsList" @click="goProductDetail(p.id)")
            div.imgBox
              img(:src="p.newsp_path")
            //- .time {{p.newsp_createTime}}
            .name {{p.title}}
        Button(type='text' @click="moreCase") 查看更多案例&nbsp;&gt;&gt;
    .clients_panel
      .p_absolute
        div.home_container
          div.h_h1.on 客户 
            span Clients
          div.h_h2 我们为1200多个客户提供了2000多次产品服务，覆盖22个行业。
          div.clients_container
            div.clients_left#easing
              div.m-text
                div.number
                  div.num1
                  div.num1
                  div.num_ico 年
                div.text 10年物业服务经验
              div.m-text
                div.number
                  div.num4
                  div.num4
                  //- div.num4
                  //- div.num4
                  div.num_ico
                    img(src="@/assets/homepage/image/h_more.png" alt="我的网站")
                div.text 涉及30多种服务品类
              div(class="m-text" style="border-left: 1px solid #dedede; border-right: 1px solid #dedede;")
                div.number
                  div.num3
                  div.num3
                  div.num3
                  div.num3
                  div.num_ico
                    img(src="@/assets/homepage/image/h_more.png" alt="我的网站")
                div.text 服务了1200多家客户
              div(class="m-text" style="border-left: 1px solid #dedede; border-right: 1px solid #dedede;")
                div.number
                  div.num2
                  div.num2
                  div.num2
                  div.num2
                  div.num_ico
                    img(src="@/assets/homepage/image/h_more.png" alt="我的网站")
                div.text 2000多个精品案例
    .newsCenter.moduleItem
      .content
        .title
          span 新闻
          span(style="color: #d28f2c") 中心
        .line
        .productTabs
          .productTabsItem
        .newsBox
          .newItem(v-for='(item,index) in newList',:key='index' @click="goNewsDetail(item.id)")
            .date
              .day {{item.day}}
              .year {{item.year}}
            .new
              .newTitle
                i(v-if='index < 3').iconfont.iconhot
                span {{item.title}}
              .newContent {{item.remark}}
        Button(type='text' @click="moreNews") 查看更多新闻&nbsp;&gt;&gt;
  </div>
</template>

<script>
import carousel from './carousel'
import common from './index.js'
import { caseShowQry, fileDetail, newShowQry } from '@/api/index'
import { url as imgUrl } from '@/api/urlConfig'

export default {
  props: {},
  data () {
    return {
      productsList: [],
      newList: []
    };
  },
  components: {
    carousel
  },
  computed: {},
  methods: {
    // 产品详情
    goProductDetail(id) {
      this.$router.push({
        path: '/productDetail',
        query: {
          id: id
        }
      })
      sessionStorage.setItem("newsType", '案例中心');
      this.$bus.$emit("updateNewsType");
    },
    // 新闻详情
    goNewsDetail(id) {
      this.$router.push({
        path: '/newsDetail',
        query: {
          id: id
        }
      })
      sessionStorage.setItem("newsType", '新闻中心');
      this.$bus.$emit("updateNewsType");
    },
    // 更多产品
    moreCase() {
      sessionStorage.setItem("newsType", '案例中心');
      this.$bus.$emit("updateNewsType");
      this.$router.push({
        path: '/caseCenter'
      })
    },
    // 更多新闻
    moreNews() {
      sessionStorage.setItem("newsType", '新闻中心');
      this.$bus.$emit("updateNewsType");
      this.$router.push({
        path: '/newsCenter'
      })
    },
    // 查询新闻
    listNewsManageRequest() {
      let params = `pageNum=1&pageSize=6`
      newShowQry(params).then(res => {
        if(res.data.code === 200 && res.data.data.records) {
          this.newList = res.data.data.records
          this.newList.forEach(item => {
            const index1 = item.newTime.indexOf("-");
            const year = item.newTime.slice(0, index1);
            item.year = year;
            const other = item.newTime.slice(index1);
            const index2 = other.indexOf(" ");
            const day = other.slice(1, index2);
            item.day = day;
            const time = other.slice(index2 + 1);
            item.time = time;
          });
        }
      })
    },
    // 查询产品
    listNewsProductRequest() {
      let params = `pageNum=1&pageSize=8&type=0`
      caseShowQry(params).then(res => {
        if(res.data.code === 200 && res.data.data.records) {
          this.productsList = res.data.data.records
          if(this.productsList.length > 0) {
            this.getCaseImage(res.data.data.records)
          }
        }
      })
    },
    // 查询案例图片
    getCaseImage(data) {
      let ids = ""
      let arr = []
      data.forEach(item => {
        arr.push(item.pid)
      })
      ids = arr.join(",")
      let params = `ids=${ids}`
      fileDetail(params).then(res => {
        if(res.data.code === 200 && res.data.data && res.data.data.length > 0) {
          res.data.data.forEach(item => {
            this.productsList.forEach(item1 => {
              if(item.id === item1.pid) {
                item1.newsp_path = imgUrl + '/file/' + item.srcPath
              }
            })
          })
          this.$forceUpdate()
        }
      })
    }
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      common()
    })
  },
  created() {
    this.listNewsProductRequest()
    this.listNewsManageRequest();
  },
}
</script>

<style scoped lang="stylus">
.homePage
  .moduleItem
    text-align center
    padding-top 60px
    .productTabs
      text-align center
      button
        margin 0 8px
        height 42px
        width 120px
        font-size 14px
    .ivu-btn-text
      display block
      margin 0 auto 38px auto
      font-size 16px
    .content
      max-width 1200px
      margin 0 auto
    .title
      text-align center
      font-size 32px
      margin-bottom 10px
    .line
      height: 2px;
      background-color #d28f2c;
      width: 100px;
      margin 0 auto;
  .productCenter
    // margin-top 24px
    .productsView
      padding-top 60px
      .productItem
        display inline-block
        height 270px
        width 25%
        text-align center
        vertical-align top
        &:hover
          .imgBox
            img
              transform scale(1.1,1.1)
              transition .5s
          .name
            cursor pointer
            color #2d8cf0
        .imgBox
          width 270px
          height 152px
          overflow hidden
          display inline-block
          margin-bottom 5px
          img
            width 100%
            height 100%
            &:hover
              cursor pointer
          // &:hover
          //   img
          //     transform scale(1.1,1.1)
          //     transition .5s
        .time,.name
          width 270px
          text-align left
          font-size 12px
          color #808080
          margin 0 auto
        .name
          font-size 16px
          margin-top 6px
          color #2A2E36CC
          transition .3s
          // &:hover
          //   cursor pointer
          //   color #2d8cf0

.newsBox
  margin-top 47px
  padding 0 15px
  .newItem
    display inline-block
    width 50%
    vertical-align top
    margin-bottom 41px
    text-align center
    cursor pointer
    &:hover
      .new
        .newTitle
          cursor pointer
          color #2d8cf0
    .date
      display inline-block
      width 80px
      text-align right
      margin-right 28px
      vertical-align top
      .day
        font-size 24px
        color #2A2E36CC
      .year
        margin-top 7px
        color #808080FF
        font-size 14px
    .new
      display inline-block
      width 65%
      text-align left
      .newTitle
        color #2A2E36
        width 100%
        font-size 18px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        transition .3s
        // &:hover
        //   cursor pointer
        //   color #2d8cf0
        .iconfont
          color #F5A623!important
          font-size 20px
      .newContent
        width 100%
        margin-top 14px
        font-size 14px
        color #808080FF
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden

.home_container .h_h1{text-align:center;font-size:40px;line-height:30px;color:#000000;padding-bottom:10px; margin:80px 0 0 0;}
.home_container .h_h1.on{background:url(../../../assets/homepage/image/s15.png) center bottom no-repeat;}
.home_container .h_h1 span{font-family:Arial;font-size:30px;line-height:30px;color:#999999;text-transform:uppercase;}
.home_container .h_h2{text-align:center;font-size:16px;line-height:30px;color:#666666;margin:10px 0 25px 0;overflow:hidden;}

.clients_panel{height: 570px;width: 100%;background: url(../../../assets/homepage/image/h_clients_bj.jpg) no-repeat center;overflow: hidden;position: relative;}
.clients_panel .home_container .h_h1,.clients_panel .home_container .h_h2{color: #000;}
.clients_panel .home_container .h_h1 span{opacity: 0.6;color: #000;}
.clients_panel .clients_container{height: 160px;width: 100%;overflow: hidden;margin-top: 80px;display: flex;justify-content: center;}
.clients_panel .clients_left{float: left;overflow: hidden;height: 160px;}
.clients_panel .clients_left .m-text{height: 160px;float: left;overflow: hidden;padding: 0 38px;text-align: center;color: #000;font-size: 16px;}
.clients_panel .clients_left .m-text .number{width: 100%;height: 120px;line-height: 120px;position: relative;}
.clients_panel .clients_left .m-text .number .num_ico{font-size: 16px;font-weight: bold;color: #000;position: absolute;top: 0;right: -15px;height: 50px;width: 20px;line-height: 35px;}
.clients_panel .clients_left .m-text .number .num1,.clients_panel .clients_left .m-text .number .num2,.clients_panel .clients_left .m-text .number .num3,.clients_panel .clients_left .m-text .number .num4{background:url(../../../assets/homepage/image/num.png) top center repeat-y;width:52px;height:90px;margin-right:5px;margin-top: 10px;display: inline-block;}
.clients_panel .clients_right{height: 160px;width: 348px;float: right;position: relative;}
.clients_panel .clients_right .swiper-clients{width: 100%;height: 100%;overflow: hidden;}
.clients_panel .clients_right .swiper-slide{background:url(../../../assets/homepage/image/h_clients_txtbj.png) no-repeat center bottom;position: relative;}
.clients_panel .clients_right .swiper-slide .g-img{position: absolute;border-radius: 50%;width: 50px;height: 50px;top: 0;left: 20px;border: 3px solid #ffffff;overflow: hidden;}
.clients_panel .clients_right .swiper-slide .g-text{padding: 30px 30px 0 20px;height: 130px;color: #000;line-height: 24px;text-align: left;font-size: 14px;}
.clients_panel .clients_right .swiper-slide .g-text .tt{font-size: 16px;text-indent: 70px;margin-bottom: 15px;}
.clients_panel .clients_right .swiper-slide .g-text .text{height: 48px;overflow: hidden;}
</style>