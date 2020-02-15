<template lang='pug'>
  div.left-bar
    .menu
      Menu(:theme="theme" active-name="news")
        MenuItem(
          v-for="(item, index) of menuItemList"
          :key='index'
          :name="item.name"
          @click.native="goLink(item)")
          Icon(:type="item.iconType")
          | {{item.content}}
</template>

<script>
export default {
  name: "",
  data() {
    return {
      theme: "dark",
      menuItemList: [
        // {
        //   name: "column",
        //   iconType: "md-document",
        //   content: "栏目管理",
        //   path: "/admin/columnManagement"
        // },
        {
          name: "news",
          iconType: "md-document",
          content: "新闻管理",
          path: "/admin/newsManagement"
        },
        {
          name: "products",
          iconType: "md-document",
          content: "产品管理",
          path: "/admin/productManagement"
        },
        // {
        //   name: "system",
        //   iconType: "md-document",
        //   content: "系统管理",
        //   path: "/admin/systemManagement"
        // },
        // {
        //   name: "schoolBadge",
        //   iconType: "md-document",
        //   content: "校徽管理",
        //   path: "/admin/schoolBadge"
        // }
      ]
    };
  },
  methods: {
    goLink(item) {
      this.$router.push({
        path: item.path
      });
    }
  }
};
</script>

<style lang='stylus'>
.left-bar
  // margin-top 70px
  .menu
    height calc(100vh - 70px) !important
    width 240px
    background #515a6e
</style>
