<template lang='pug'>
  div.top-bar
    .title 中诺物业网站管理系统
      .user
        img(:src="headPath")
        span {{userName}}
</template>

<script>
export default {
  name: "",
  data() {
    return {
      headPath: "",
      userName: ""
    };
  },
  methods: {}
};
</script>

<style lang='stylus'>
.top-bar
  height 70px
  width 100%
  background #6e6e6e
  line-height @height
  padding 0 40px
  text-align left
  .title
    color #fff
    font-size 28px
    margin-top 0
</style>
