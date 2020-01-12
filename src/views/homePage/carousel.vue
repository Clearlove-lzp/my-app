<!-- 轮播图 -->
<template>
  <div class="carousel">
    <Carousel autoplay :autoplay-speed="5000" v-model="value" loop arrow="never">
      <CarouselItem>
        <img style="width: 100%" src="@/assets/homepage/image/1.jpg" alt="">
      </CarouselItem>
      <CarouselItem>
        <img style="width: 100%" src="@/assets/homepage/image/2.jpg" alt="">
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      value: 0
    };
  },
  components: {},
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
  created() {},
}
</script>

<style scoped lang="stylus">
img
  display block
  width 100%
  height auto
>.carousel
  height 100%
  .ivu-carousel
    height 100%
    .ivu-carousel-list
      width 100%

</style>