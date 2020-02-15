<template lang="pug">
  .fornt-index
    <Header></Header>
    .content
      router-view
    <Footer></Footer>
</template>

<script>
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'

export default {
  name: 'home',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped lang="stylus">

</style>