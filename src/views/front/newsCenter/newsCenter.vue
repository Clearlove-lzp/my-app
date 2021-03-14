<template lang="pug">
  div.newsInfo
    .bannerimg
      img(src="@/assets/caseAndnews/banner_p.png")
    p.newsTitle 新闻中心
    //- div.button
    //-   div.eachButton(v-for="(item, index) in newsTitle",:key="index",:class="{'highLight': type == item}",@click="selectButton(item)") {{item}}
    div.newsList
      div.eachNews(v-for="(item, index) in dataArr1",:key=" index",@click="showDetail(item)")
        div.left
          p.day {{item.day}}
          p.year {{item.year}}
        div.middle
          img(v-show="item.newsm_path",:src="item.newsm_path")
          img(v-show="!item.newsm_path",src="@/assets/caseAndnews/aaa.png")
        div.right
          span(v-show="index < 3 && info.pageNo === 1").hot Hot
          p.title(:class="{'leftPadding': index < 3 && info.pageNo === 1}") {{item.title}}
          p.content {{item.remark}}
          // p.time {{item.time}}
    div.page(v-show="totalPages1 > 3")
      Page(:total="totalPages1", :page-size="info.pageSize" @on-change="change")
    //- div.page(v-show="type=='行业新闻' && totalPages2 > 30")
    //-   Page(:total="totalPages2",@on-change="change")
    //- div.showMore(@click="showMore",ref="showMore",v-show="type=='行业新闻'") 查看更多&gt;
    //- div.showMore(@click="showMore",ref="showMore1",v-show="type=='公司新闻'") 查看更多&gt;
</template>

<script>
import { newShowQry, fileDetail } from "@/api/index"
import { url as imaUrl } from '@/api/urlConfig'

export default {
  name: "newsInfo",
  components: {
  },
  data() {
    return {
      type: "行业新闻",
      newsTitle: ["行业新闻", "公司新闻"],
      info: {
        newsm_newsType: "",
        pageNo: 1,
        pageSize: 3
      },
      totalPages1: 0,
      totalPages2: 0,
      pageSize1: 3,
      pageSize2: 3,
      dataArr: [],
      dataArr1: []
    };
  },
  methods: {
    showDetail(obj) {
      // const obj = {};
      // obj.id = this.dataArr[index].id;
      // obj.type = this.type;
      // window.sessionStorage.setItem("newsId", JSON.stringify(obj));
      this.$router.push({
        path: "/newsDetail",
        query: {
          id: obj.id
        }
      });
    },
    showMore() {
      if (this.type == "行业新闻") {
        this.pageSize1 += 3;
        this.info.pageSize = this.pageSize1;
      } else {
        this.pageSize2 += 3;
        this.info.pageSize = this.pageSize2;
      }
      this.getNewsList();
    },
    change(value) {
      this.info.pageNo = value;
      this.getNewsList();
    },
    selectButton(item) {
      this.type = item;
      sessionStorage.setItem("newsType", item);
      this.info.pageNo = 1;
      if (this.type === "行业新闻") {
        this.info.pageSize = this.pageSize1;
      } else {
        this.info.pageSize = this.pageSize2;
      }
      this.getNewsList();
    },
    getNewsList() {
      // this.type = window.sessionStorage.getItem("newsType");
      // this.info.newsm_newsType = this.type;
      let arr = []
      this.dataArr.forEach((item, index) => {
        let num = this.info.pageNo * this.info.pageSize
        if(index < num && index >= (num - 3)) {
          arr.push(item)
        }
      })
      this.dataArr1 = arr
      this.totalPages1 = this.dataArr.length;
    },
    // 查询新闻
    listNewsManageRequest() {
      let params = `pageNum=${this.info.pageNo}&pageSize=${this.info.pageSize}`
      newShowQry(params).then(res => {
        if(res.data.code === 200 && res.data.data.records) {
          this.dataArr1 = res.data.data.records
          this.dataArr1.forEach(item => {
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
          this.totalPages1 = res.data.data.total
          if(this.dataArr1.length > 0) {
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
            this.dataArr1.forEach(item1 => {
              if(item.id === item1.pid) {
                item1.newsm_path = imaUrl + '/file/' + item.srcPath
              }
            })
          })
          this.$forceUpdate()
        }
      })
    }
  },
  mounted() {
  },
  created() {
    // this.getNewsList()
    this.listNewsManageRequest();
  }
};
</script>

<style lang="stylus">
.newsInfo
  font-family:MicrosoftYaHeiUI;
  .bannerimg
    width 100%
    // background: blue;
    img
      display block
      width 100%
  .newsTitle
    width:100%;
    margin 60px 0 42px 0
    text-align center
    height:41px;
    font-size:32px;
    color:rgba(42,46,54,1);
    line-height:41px;
  .button
    width 216px
    height 42px
    margin 0 auto 30px
    overflow hidden
    div
      float left
      width 100px
      height 100%
      border-radius 4px
      line-height 42px
      font-size:14px;
      text-align center
      border 1px solid rgba(210,221,236,1)
      cursor pointer
      &:nth-of-type(1)
        margin-right 10px
      &:hover
        background-color #0294FD
        color #FFF
        border none
    .highLight
      background-color #0294FD
      color #FFF
      border none
  .newsList
    max-width 1064px
    width 78%
    margin 0 auto
    .eachNews
      cursor pointer
      padding 32px 0
      border-bottom 1px solid #D2DDEC
      overflow hidden
      &:hover
        .right
          .title
            color #0294fd
        .middle
          overflow hidden
          img
            transform scale(1.2)
            transition all 0.2s linear 0s
      div
        margin-right 20px
        float left
      .left
        width 20%
        height 124px
        text-align right
        .day
          font-size 36px
        .year
          font-size:14px;
          color:rgba(128,128,128,1);
      .middle
        width 200px
        height 124px
        overflow hidden
        img
          width 100%
          height 100%
          transform scale(1)
          transition all 0.6s linear 0s
      .right
        width 46%
        position relative
        .hot
          position absolute
          width 24px
          height 24px
          background rgba(245,166,35,1)
          border-radius 4px
          text-align center
          top 4px
          line-height 24px
          color #FFF
          font-size 12px
        .title
          font-size:20px;
          width 100%
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          color:rgba(42,46,54,1);
        .leftPadding
          padding-left 30px
        .content
          font-size:14px;
          height 60px
          margin 6px 0
          overflow:hidden;
          text-overflow:ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          color:rgba(42,46,54,0.75);
        .time
          font-size:14px;
          color:rgba(128,128,128,1);
  .page
    padding 40px 0
    text-align center
  .showMore
    display none
@media screen and (max-width : 997px)
  .newsInfo
    .newsList
      width 100%
      padding 0 6.8vw
      .eachNews
        padding 16px 0
        .left
          display none
        .middle
          width 20%
          height auto
        .right
          width 75%
          margin-right 0
          .title
            font-size 18px
          .content
            -webkit-line-clamp: 2;
            height 46px
            font-size 14px
          .time
            font-size 14px
        div
          margin-right 2vw
    .page
      display none
    .showMore
      display block
      text-align center
      line-height 80px
      cursor pointer
      font-size:14px;
      color:rgba(2,148,253,1)
</style>
