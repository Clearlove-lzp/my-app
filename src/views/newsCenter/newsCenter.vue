<template lang="pug">
  div.newsInfo
    .bannerimg
      img(src="@/assets/caseAndnews/banner_p.png")
    p.newsTitle 新闻中心
    //- div.button
    //-   div.eachButton(v-for="(item, index) in newsTitle",:key="index",:class="{'highLight': type == item}",@click="selectButton(item)") {{item}}
    div.newsList
      div.eachNews(v-for="(item, index) in dataArr1",:key=" index",@click="showDetail(index)")
        div.left
          p.day {{item.day}}
          p.year {{item.year}}
        div.middle
          img(v-show="item.newsm_path",:src="item.newsm_path")
          img(v-show="!item.newsm_path",src="@/assets/caseAndnews/aaa.png")
        div.right
          span(v-show="index < 3 && info.pageNo === 1").hot Hot
          p.title(:class="{'leftPadding': index < 3 && info.pageNo === 1}") {{item.newsm_title}}
          p.content {{item.newsm_remark}}
          p.time {{item.time}}
    div.page(v-show="totalPages1 > 3")
      Page(:total="totalPages1", :page-size="info.pageSize" @on-change="change")
    //- div.page(v-show="type=='行业新闻' && totalPages2 > 30")
    //-   Page(:total="totalPages2",@on-change="change")
    //- div.showMore(@click="showMore",ref="showMore",v-show="type=='行业新闻'") 查看更多&gt;
    //- div.showMore(@click="showMore",ref="showMore1",v-show="type=='公司新闻'") 查看更多&gt;
</template>

<script>

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
      dataArr: [
        {
          day: '10-25',
          year: '2019',
          newsm_title: '三桥老街西城往事',
          newsm_remark: '三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事'
        },
        {
          day: '10-25',
          year: '2019',
          newsm_title: '三桥老街西城往事',
          newsm_remark: '三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事'
        },
        {
          day: '10-25',
          year: '2019',
          newsm_title: '三桥老街西城往事',
          newsm_remark: '三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事'
        },
        {
          day: '10-25',
          year: '2019',
          newsm_title: '三桥老街西城往事',
          newsm_remark: '三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事'
        },
        {
          day: '10-25',
          year: '2019',
          newsm_title: '三桥老街西城往事',
          newsm_remark: '三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事'
        },
        {
          day: '10-25',
          year: '2019',
          newsm_title: '三桥老街西城往事',
          newsm_remark: '三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事'
        },
        {
          day: '10-25',
          year: '2019',
          newsm_title: '三桥老街西城往事',
          newsm_remark: '三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事三桥老街西城往事'
        },
      ],
      dataArr1: []
    };
  },
  methods: {
    showDetail(index) {
      const obj = {};
      obj.id = this.dataArr[index].id;
      obj.type = this.type;
      window.sessionStorage.setItem("newsId", JSON.stringify(obj));
      this.$router.push({
        path: "/newsDetail"
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
    }
  },
  mounted() {
  },
  created() {
    this.getNewsList()
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
