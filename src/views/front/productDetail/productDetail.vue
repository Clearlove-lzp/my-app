<template lang="pug">
  div.newsDetail
    .bannerimg
      img(src="@/assets/caseAndnews/banner_p.png")
      //- img(src="../../../assets/newsInfo/banner_news.png",v-if="location === '新闻详情'")
    .content
      .crumb
        Breadcrumb
          Breadcrumb-item(to="/index") 首页
          Breadcrumb-item(v-if="location === '新闻详情'",to="/newsCenter") 新闻中心
          Breadcrumb-item(v-if="location === '案例详情'",to="/caseCenter") 案例中心
      .detailBox
        p.title {{data.title}}
        p.time {{data.createTime}}
        div.newsm_content(v-html="data.des")
      // .preOrnext(v-show="location === '新闻详情'")
        p.pre(v-show="data1.newsm_title",@click="showPreOrNext('上一篇')") 上一篇&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{data1.newsm_title}}
        p.next(v-show="data2.newsm_title",@click="showPreOrNext('下一篇')") 下一篇&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{data2.newsm_title}}
</template>

<script>
import { caseInfo, newInfo } from '@/api/index'

export default {
  name: "newsDetail",
  components: {
  },
  data() {
    return {
      data: {},
      data1: {},
      data2: {
      },
      location: ""
    };
  },
  methods: {
    showPreOrNext(value) {
      let obj = {};
      if (value == "上一篇") {
        obj = {
          id: this.data1.id,
          type: this.data1.newsm_newsType
        };
      } else {
        obj = {
          id: this.data2.id,
          type: this.data2.newsm_newsType
        };
      }
      window.sessionStorage.setItem("newsId", JSON.stringify(obj));
      setTimeout(() => {
        this.getNewsDetail();
      }, 100);
    },
    getOtherData(type, num) {
      this.data1 = {};
      this.data2 = {};
      this.$http
        .listNewsManageRequest({
          newsm_newsType: type,
          newsm_seq: num,
          pageNo: 1,
          pageSize: 1
        })
        .then(res => {
          if (res.data.success) {
            if (res.data.data.list.length > 0) {
              if (num < this.data.newsm_seq) {
                this.data1 = res.data.data.list[0];
              } else if (num > this.data.newsm_seq) {
                this.data2 = res.data.data.list[0];
              }
            }
          }
        });
    },
    // 根据Id查询新闻
    getNewsManageById(id) {
      let params = `id=${id}`
      newInfo(params).then(res => {
        if(res.data.code === 200 && res.data.data) {
          this.data = res.data.data
        }
      })
    },
    // 根据Id查询产品
    requestidProduct(id) {
      let params = `id=${id}`
      caseInfo(params).then(res => {
        if(res.data.code === 200 && res.data.data) {
          this.data = res.data.data
        }
      })
    },
  },
  mounted() {
    // this.$bus.$on("updateProduct", res => {
    //   setTimeout(() => {
    //     const index = location.href.indexOf("newsDetail");
    //     if (index > 0) {
    //       this.location = "新闻详情";
    //     } else {
    //       this.location = "产品详情";
    //       this.getProductDetail();
    //     }
    //   }, 499);
    // });
  },
  created() {
    const index = location.href.indexOf("newsDetail");
    if (index > 0) {
      this.location = "新闻详情";
      this.getNewsManageById(this.$route.query.id)
    } else {
      this.location = "案例详情";
      this.requestidProduct(this.$route.query.id)
    }
  }
};
</script>

<style lang="stylus">
.newsDetail
  font-family:MicrosoftYaHeiUI;
  .bannerimg
    width 100%
    img
      display block
      width 100%
  .content
    width 80%
    max-width 1064px
    margin 0 auto
    font-size 14px
    .crumb
      margin-top 40px
      border-bottom 1px solid rgba(210,221,236,1);
      .ivu-breadcrumb
        line-height:24px;
        letter-spacing:1px;
        span
          .ivu-breadcrumb-item-link
            color:rgba(42,46,54,0.8);
          &:hover
            .ivu-breadcrumb-item-link
              color rgb(59, 179, 235)
          &:nth-last-of-type(1)
            .ivu-breadcrumb-item-link
              color:rgba(128,128,128,1);
              font-weight 500
    .detailBox
      border-bottom 1px solid rgba(210,221,236,1);
      .title
        font-size:26px;
        color:rgba(42,46,54,0.8);
        line-height:33px;
        margin-top 24px
      .time
        color:rgba(128,128,128,1);
        line-height:51px;
        margin-bottom 20px
      .newsm_content
        color:rgba(42,46,54,0.75);
        line-height:24px;
        letter-spacing:1px;
        padding-bottom 32px
        img
          width:40%;
          // height:208px;
          margin 32px 16px 32px 0
    .preOrnext
      p
        margin-top 30px
        font-size:12px;
        cursor pointer
        color:rgba(42,46,54,0.75);
        &:hover
          color rgb(59, 179, 235)
      &:nth-last-of-type(1)
        margin-bottom 30px
@media screen and (max-width : 997px)
  .newsDetail
    .content
      .crumb
        margin-top 20px
      .detailBox
        .title
          font-size 24px
          margin-top 20px
        .time
          // line-height 45px
          margin-bottom 10px
        .newsm_content
          img
            width 45%
      .preOrnext
        p
          margin-top 23px
          font-size:12px;
          cursor pointer
          color:rgba(42,46,54,0.75);
          &:hover
            color rgb(59, 179, 235)
        &:nth-last-of-type(1)
          margin-bottom 23px
@media screen and (max-width : 400px)
  .newsDetail
    .content
      .crumb
        margin-top 10px
      .detailBox
        .newsm_content
          img
            width 100%
            margin-bottom 16px
            margin-right 0
            &:nth-of-type(1)
              margin-top 16px
</style>
