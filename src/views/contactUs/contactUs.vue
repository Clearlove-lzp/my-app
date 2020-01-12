<!-- 联系我们 -->
<template>
  <div class="contactUs">
    <Map></Map>
    <div class="container">
    	<div class="contact">
        <Row>
          <Col span="12">
            <div class="contactWay">
              <h3>南京科技信息系统有限公司</h3>
                <p><i class="fa fa-map-marker icon-box icon-xs"></i>地址：南京浦口区东大路2号东大科技园B座2楼</p>
                <p><i class="fa fa-phone icon-box icon-xs"></i>服务电话：400-030-xxxx</p>
                <p><i class="fa fa-whatsapp icon-box icon-xs"></i>公司电话：025-85991038 (周一至周五 08:30 — 17:30)</p>
                <p><i class="fa fa-internet-explorer icon-box icon-xs"></i>网址：www.becess.com</p>
                <p><i class="fa fa-train icon-box icon-xs"></i>地铁3号线</p>
            </div>
          </Col>
          <Col span="12">
            <img src="@/assets/contactUs/image/soluImg1.png" alt="" width="100%">
          </Col>
        </Row>
        	<!-- <div class="row">
            	<div class="col-xs-12 col-sm-12 col-md-6 wow fadeInLeft">
                <div class="contactWay">
                    <h3>南京科技信息系统有限公司</h3>
                      <p><i class="fa fa-map-marker icon-box icon-xs"></i>地址：南京浦口区东大路2号东大科技园B座2楼</p>
                      <p><i class="fa fa-phone icon-box icon-xs"></i>服务电话：400-030-xxxx</p>
                      <p><i class="fa fa-whatsapp icon-box icon-xs"></i>公司电话：025-85991038 (周一至周五 08:30 — 17:30)</p>
                      <p><i class="fa fa-internet-explorer icon-box icon-xs"></i>网址：www.becess.com</p>
                      <p><i class="fa fa-train icon-box icon-xs"></i>地铁3号线</p>
                  </div>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 wow fadeInLeft">
                    <img src="@/assets/contactUs/image/soluImg1.png" alt="" width="100%">
              </div>
          </div> -->
        </div>
    </div>
  </div>
</template>

<script>
import Map from './map'

export default {
  props: {},
  data () {
    return {
    };
  },
  components: {
    Map
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
  created() {},
}
</script>

<style scoped>
.contact{ padding:95px 0;}
.contactWay{ font-size:15px; color:#777777; line-height:36px; padding-left:90px;}
.contactWay h3{ font-size:26px; color:#222222; padding-bottom:15px;font-weight: bold}
</style>