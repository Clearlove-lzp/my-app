<template lang='pug'>
  div.admin-index
    AdminTopBar
    AdminTLeftBar
    .content
      router-view
</template>

<script>
import AdminTopBar from '@/components/admin/topBar'
import AdminTLeftBar from '@/components/admin/leftBar'
export default {
  name: "admin",
  data() {
    return {};
  },
  methods: {},
  components: {
    AdminTopBar,
    AdminTLeftBar
  }
};
</script>

<style lang='stylus'>
.admin-index
  position relative
  min-width 1200px
  .content
    position absolute
    top 70px
    left 240px
    width calc(100vw - 240px)
    min-width 960px
    height: calc(100vh - 70px) !important;
    overflow: auto;
</style>
