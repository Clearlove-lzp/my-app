<template lang='pug'>
  header
    .wideMenu
      Menu(mode="horizontal",theme="light",:active-name="activeIndex")
        .menuLogo(@click='backHome')
          img(src='@/assets/header/znwy.jpg')
        .menuRight
          .menu(v-for='(item,index) in menuList',:key='index')
            MenuItem(:name='index',v-if='!item.newsColumnList',@click.native='changePage(item)') {{item.column_name}}
            //- template.ivu-menu-item(v-else-if='item.column_name==="产品中心"')
            //-   Dropdown.productBtn
            //-     a(href="javascript:void(0)") {{item.column_name}}
            //-     Icon(type="ios-arrow-down")
            //-     DropdownMenu(slot="list").lv2
            //-       Dropdown(placement="right-start").lv3
            //-         DropdownItem 公共管理类
            //-           Icon(type="ios-arrow-forward")
            //-         DropdownMenu(slot="list").lv4
            //-           Dropdown(placement="right-start",v-for="(item3,index3) in publicList",:key='index3')
            //-             DropdownItem {{item3.category_name}}
            //-               Icon(type="ios-arrow-forward")
            //-             DropdownMenu(slot="list")
            //-               DropdownItem(placement="right-start",v-for="(item4,index4) in item3.newsProductList",:key='index4',@click.native='skip(item4.id)') {{item4.newsp_title}}
            //-       Dropdown(placement="right-start").lv3
            //-         DropdownItem 思想政治类
            //-           Icon(type="ios-arrow-forward")
            //-         DropdownMenu(slot="list").lv4
            //-           Dropdown(placement="right-start",v-for="(item3,index3) in ideaList",:key='index3')
            //-             DropdownItem {{item3.category_name}}
            //-               Icon(type="ios-arrow-forward")
            //-             DropdownMenu(slot="list")
            //-               DropdownItem(placement="right-start",v-for="(item4,index4) in item3.newsProductList",:key='index4',@click.native='skip(item4.id)') {{item4.newsp_title}}
            //- Submenu(:name='index',v-else)
            //-   template(slot="title",@click.native='changePage(item)') {{item.column_name}}
            //-   MenuItem(v-for='(item2,index2) in item.newsColumnList',@click.native='changePage(item2)',:key='index2',:name='index+"-"+index2') {{item2.column_name}}
    .narrowMenu
      Menu.menuTop(mode="horizontal",theme="light",:active-name="activeIndex")
        .menuLogo
          img(src='@/assets/header/znwy.jpg')
        .menuRight
          .btnMun(@click='changeMenu',:class='{"showMenu":flag==="1","closeMenu":flag!=="1"}')
            .line
            .line
            .line
      Collapse(simple,v-model="flag")
        Panel(name='1')
          div(slot='content')
            Menu.menuBottom(theme="light",:active-name="activeIndex")
              .menu(v-for='(item,index) in menuList',:key='index')
                MenuItem(:name='index',v-if='!item.newsColumnList',@click.native='changePage(item)') {{item.column_name}}
                //- Submenu(:name='index',v-else)
                //-   template(slot="title") {{item.column_name}}
                //-   MenuItem(v-for='(item2,index2) in item.newsColumnList',:key='index2',:name='index+"-"+index2',@click.native='changePage(item2)',) {{item2.column_name}}
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuList: [
        {
          column_name: '首页',
          column_link: '/index'
        },
        {
          column_name: '案例中心',
          column_link: '/caseCenter'
        },
        {
          column_name: '新闻中心',
          column_link: '/newsCenter'
        },
        {
          column_name: '服务支持',
          column_link: '/servicesupport'
        },
        {
          column_name: '关于我们',
          column_link: '/aboutOurs'
        },
        {
          column_name: '联系我们',
          column_link: '/contactUs'
        }
      ],
      activeIndex: 0,
      flag: "0",
      publicList: [],
      ideaList: []
    };
  },
  methods: {
    // skip(x) {
    //   sessionStorage.setItem("productDetail", x);
    //   this.$bus.$emit("updateProduct");
    //   this.$router.push({ path: "/productDetail" });
    // },
    backHome() {
      this.$router.push({ path: "/index" });
    },
    changePage(item) {
      this.flag = "0";
      sessionStorage.setItem("newsType", item.column_name);
      // this.$bus.$emit("updateNewsType");
      this.$router.push({ path: item.column_link });
    },
    changeMenu() {
      if (this.flag === "1") {
        this.flag = "0";
      } else {
        this.flag = "1";
      }
    },
    getMenuLocation() {
      let newsType = sessionStorage.getItem("newsType")
      if(newsType) {
        this.menuList.forEach((item, index) => {
          if(item.column_name === newsType) {
            this.activeIndex = index
          }
        })
      }else{
        this.activeIndex = 0
      }
    }
  },
  created() {
    this.getMenuLocation()
    this.$bus.$on("updateNewsType", res => {
      this.getMenuLocation();
    });
  }
};
</script>

<style lang='stylus'>
header
  .wideMenu
    .ivu-menu
      height 76px
  .ivu-menu
    padding 0px 15px
    color #2A2E36CC
    max-width 1200px
    margin 0 auto
    .menuLogo
      display inline-block
      float left
      height 76px
      &:hover
        cursor pointer
      img
        height: auto;
        margin-top: 10px;
        width: 200px;
    .menuRight
      float right
      height 76px
      .menu
        display inline-block
        margin-top 8px
        .ivu-menu-item-active
          border-bottom none
          color #4197E8
        .ivu-menu-item,.ivu-menu-submenu
          font-size 16px
          border-bottom none!important
          .ivu-select-dropdown
            top 65px!important
          &:hover
              border-bottom none!important
              color #4197E8!important
        .ivu-select-dropdown
          border-top 4px solid #4A90E2FF
      .productBtn
        padding 0 20px
        position relative
        top -25px
        a
          font-size 16px
          color #2A2E36CC
        .ivu-select-dropdown
          width 160px
          text-align center
          font-size 14px
          text-align left
        >.ivu-select-dropdown
          top 64px!important
          i
            float right
          .lv2
            line-height 36px
            .lv4
              .ivu-select-dropdown
                width 260px
.ivu-menu-horizontal.ivu-menu-light:after,.ivu-menu-vertical.ivu-menu-light:after
  display none
.narrowMenu
  display none
@media screen and (max-width: 997px)
  header
    .wideMenu
      display none
    .narrowMenu
      display block
      .menuTop
        height 76px
        .btnMun
          margin-top 26px
          &:hover
            cursor pointer
          .line
            width 28px
            height 2px
            background #0294FD
            margin-bottom 7px
            transition .3s
        .showMenu
          .line
            &:nth-child(1)
              transform-origin 4px 7px
              transform rotateZ(45deg)
            &:nth-child(2)
              background #fff
            &:nth-child(3)
              transform-origin 4px -5px
              transform rotateZ(-45deg)
      .menuBottom
        .ivu-menu-item,.ivu-menu-submenu-title
          padding 14px 0
        .ivu-menu
          padding 0!important
          .ivu-menu-item
            padding-left 15px!important
      .ivu-collapse
        border none
        .ivu-menu-vertical
          width 100%!important
        .ivu-collapse-header
          display none
        .ivu-collapse-content
          width 100%
          padding 0
          .ivu-collapse-content-box
            padding-bottom 0

</style>
