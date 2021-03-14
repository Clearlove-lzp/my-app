<template lang="pug">
  div.productlist
    .bannerimg
      img(src="@/assets/caseAndnews/banner_p.png")
    div.productcenter
      .protitle 案例中心
      //- div.button
      //-   div.eachButton(v-for="(item, index) in productTitle",:key="index",:class="{'highLight': type == item}",@click="selectButton(item)") {{item}}
    .subbutton
      Button.Button(:type="categoryIndex < 0 ? 'primary' : 'default'" @click="alllist") 全部
      Button.Button(v-for="(c, index) of categoryList" ,:key="index" ,:type="categoryIndex === index ? 'primary' : 'default'" ,@click.native="changeProductView(index,c)") {{c.category_name}}
      .totalnum 检索到 {{totalRecords}} 条信息
    //- .dropnum
    //-   .totalnum 检索到 {{totalRecords}} 条信息
    //-   .Dropdown
    //-     a(href="javascript:void(0)" @click="showCategoryTypeList = !showCategoryTypeList") 筛选
    //-       Icon(type="ios-arrow-down")
    //-     ul.category-type-list(v-show="showCategoryTypeList")
    //-       li(@click="alllist") 全部
    //-       li(v-for="(c, index) of categoryList" @click="changeProductView(index,c)") {{c.category_name}}
    .product
      .mainlist(v-for="(x,index) of productsList2",:key="index",@click="showProductDetail(x)")
        div.imgBox
          img(:src="x.newsp_path")
        //- .time {{x.newsp_createTime}}
        .title {{x.title}}
    //- .page
    //-   Page(:total="type=='公共管理类' ? totalPages1 : totalPages2",@on-change="change")
    //- .showMore(@click="showMore",ref="showMore",v-show="type=='公共管理类'") 查看更多&gt;
    //- .showMore(@click="showMore",ref="showMore1",v-show="type=='思想政治类'") 查看更多&gt;
</template>

<script>
import { caseShowQry, fileDetail } from '@/api/index'
import { url as imaUrl } from '@/api/urlConfig'

export default {
  components: {
  },
  data() {
    return {
      info: {
        newsp_category: "",
        pageNo: 1,
        pageSize: 16
      },
      info2: {
        newsp_categoryType: "",
        pageNo: 1,
        pageSize: 16
      },
      totalRecords: 0,
      totalPages1: 0,
      totalPages2: 0,
      pageSize1: 16,
      pageSize2: 16,
      categoryIndex: -1,
      categoryList: [
        {
          category_name: '医院服务类',
          no: "1"
        },
        {
          category_name: '政府机关',
          no: "2"
        },
        {
          category_name: '企事业办公楼',
          no: "3"
        },
        {
          category_name: '公共服务类',
          no: "4"
        },
      ], // 类别列表
      productsList: [],
      productsList2: [],
      // category: "公共管理类",
      type: "公共管理类",
      productTitle: ["公共管理类", "思想政治类"],
      showCategoryTypeList: false
    };
  },
  methods: {
    showMore() {
      if (this.type == "公共管理类") {
        this.pageSize1 += 3;
        this.info.pageSize = this.pageSize1 - 8;
      } else {
        this.pageSize2 += 3;
        this.info.pageSize = this.pageSize2 - 8;
      }
    },
    showProductDetail(x) {
      // window.sessionStorage.setItem("productDetail", x.id);
      this.$router.push({
        path: "productDetail",
        query: {
          id: x.id
        }
      });
    },
    selectButton(item) {
      // this.category = item
      sessionStorage.setItem("proType", item);
      this.type = item;
      this.info.pageNo = 1;
      if (this.type === "公共管理类") {
        this.info.pageSize = this.pageSize1;
      } else {
        this.info.pageSize = this.pageSize2;
      }
      this.alllist();
    },
    change(value) {
    },
    alllist() {
      this.productsList2 = JSON.parse(JSON.stringify(this.productsList))
      this.totalRecords = this.productsList2.length
      this.categoryIndex = -1
      // this.showCategoryTypeList = false
    },
    changeProductView(index, c) {
      this.categoryIndex = index;
      let arr = []
      this.productsList.forEach(item => {
        if(c.no === item.type) {
          arr.push(item)
        }
      })
      this.productsList2 = arr
      this.totalRecords = this.productsList2.length
      // this.showCategoryTypeList = false
      this.change();
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
                item1.newsp_path = imaUrl + '/file/' + item.srcPath
              }
            })
          })
          this.$forceUpdate()
          this.alllist()
        }
      })
    }
  },
  mounted() {
  },
  created() {
    this.listNewsProductRequest()
    // this.alllist();
  }
};
</script>
<style lang="stylus">
.productlist
  margin 0
  padding 0
  >.bannerimg
    img
      display block
      width 100%
  >.productcenter
    width 100%
    height 50px
    margin-top 60px
    .protitle
      width 128px
      height 36px
      font-size 32px
      font-family MicrosoftYaHeiUI
      color rgba(42, 46, 54, 1)
      margin 0 auto
      line-height 33px
    .button
      width 256px
      height 42px
      margin 0 auto
      margin-top 42px
      overflow hidden
      div
        float left
        width 120px
        height 100%
        line-height 42px
        font-size 14px
        text-align center
        border 1px solid rgba(210, 221, 236, 1)
        cursor pointer
        &:nth-of-type(1)
          margin-right 16px
      .highLight
        background-color #0294FD
        color #FFF
        border-radius 4px
        border none
  >.subbutton
    max-width 1170px
    height 36px
    margin 60px auto 40px
    .Button
      width auto
      height 36px
      margin-right 8px
      text-align center
      border none
      &:hover
        background-color #2d8cf0
        color #fff
    .totalnum
      width 110px
      height 36px
      float right
      text-align right
      line-height 36px
      font-size 14px
      font-family MicrosoftYaHeiUI
      color rgba(128, 128, 128, 0.6)
  >.dropnum
    display none
  >.product
    max-width 1170px
    margin 0 auto
    .mainlist
      width 25%
      height 240px
      display inline-block
      vertical-align top
      text-align center
      // background yellow
      .imgBox
        width 270px
        height 152px
        overflow hidden
        display inline-block
        cursor pointer
        margin-bottom 5px
        img
          width 100%
          height 100%
        &:hover
          img
            transform scale(1.1, 1.1)
            transition 0.5s
      // img
      // width 90%
      // height auto
      // max-height 152px
      .time
        width 90%
        height 25px
        font-size 12px
        overflow hidden
        font-family MicrosoftYaHeiUI
        color rgba(42, 46, 54, 0.8)
        margin 8px 0
        line-height 25px
        text-align left
        margin 0 auto
      .title
        width 90%
        height 54px
        font-size 18px
        font-family MicrosoftYaHeiUI
        color rgba(42, 46, 54, 0.8)
        line-height 27px
        margin 0 auto
        text-align left
  >.page
    width 600px
    text-align center
    margin 90px auto 60px
  >.showMore
    display none
@media screen and (min-width: 997px) and (max-width: 1078px)
  .productlist
    >.product
      .mainlist
        width 25%
        height auto
        text-align center
        margin 0
        margin-bottom 10px
        .imgBox
          width 250px
          height 152px
          overflow hidden
          display inline-block
          margin-bottom 5px
          img
            width 100%
            height 100%
@media screen and (max-width: 997px)
  .productlist
    >.bannerimg
      width 100%
      img
        display block
        width 100%
    >.productcenter
      width 100%
      height 125px
      margin-top 60px
      margin-bottom 46px
      .protitle
        width 120px
        height 42px
        font-size 26px
        font-family MicrosoftYaHeiUI
        color rgba(42, 46, 54, 1)
        margin 0 auto
        line-height 41px
      .button
        width 256px
        height 42px
        margin 0 auto
        margin-top 42px
        overflow hidden
        div
          float left
          width 120px
          height 100%
          line-height 42px
          font-size 14px
          text-align center
          border 1px solid rgba(210, 221, 236, 1)
          cursor pointer
          &:nth-of-type(1)
            margin-right 16px
        .highLight
          background-color #0294FD
          color #FFF
          border-radius 4px
          border none
    >.subbutton
      display none
    >.dropnum
      display block
      width 80%
      height 40px
      margin 0 auto 20px
      .totalnum
        line-height 40px
        float left
      .Dropdown
        position relative
        margin-top 10px
        float right
        .category-type-list
          top 28px
          right 50%
          transform translateX(40%)
          position absolute
          list-style none
          display block
          min-width 30vw
          // border 2px solid #cccccc
          -moz-box-shadow 0px 1px 6px #b6adad
          -webkit-box-shadow 0px 1px 6px #b6adad
          box-shadow 0px 1px 6px #b6adad
          border-radius 3px
          background #fff
          li
            display block
            padding 4px 15px
            // padding-left 15px
    >.product
      .mainlist
        width 100% !important
        height auto
        text-align center
        margin 0
        margin-bottom 10px
        .imgBox
          width 80%
          height auto
          margin 0 auto
        .time, .title
          width 80%
          margin 0 auto
          text-align left
    >.page
      display none
    >.showMore
      display block
      // background red
      text-align center
      line-height 80px
      cursor pointer
      font-size 14px
      color rgba(2, 148, 253, 1)
</style>
