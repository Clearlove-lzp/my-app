<template lang="pug">
  div.myMap
    div.mapContent
      p.title 联系我们
      p.brief 给自己一个全新蜕变的机会，我们一起杨帆启航
      div.box
        //- div.changeItem(v-for="(item, index) in select",:class="{'jing': item == '京'}",@click="change(item)") {{item}}
        <div :id="mapId" class="mapId" style="width: 100%;height: 360px;overflow: hidden;margin:0;font-family:'微软雅黑'">
      </div>
</template>

<script>
import loadBMap from "./loadMap.js";
export default {
  name: "myMap",
  data() {
    return {
      // select: ["京", "沪"],
      mapId: "BMap-" + parseInt(Date.now() + Math.random()),
      wodeMap: null
    };
  },
  methods: {
    change(item) {
      if  (item === "京") {
        this.initMap_jing();
      }  else {
        this.initMap();
      }
    },
    initMap_jing() {
      loadBMap("odVtZzMi9ihkDivAWB5PIk6qGpzuk2k1")
        .then(() => {
          const sContent =            "<div style='width: 287px;position: relative'>" +
            "<h4 style='margin:0 0 5px 0;padding:0.2em 0;font-size: 20px;rgba(28,34,44,1)'>北京分公司</h4>" +
            "<p style='margin-bottom:5px;line-height:1.5;font-size:12px;color:rgba(42,46,54,0.75);line-height:24px;'>北京市丰台区海鹰路5号赛欧广场229室</p>" +
            "<p style='color: font-size:14px;font-family:MicrosoftYaHeiUI-Bold;font-weight:bold;color:rgba(65,151,232,1);line-height:24px;font-size: 14px'><img id='imgDemo1' src='./static/img/Group.png' width='14' style='margin-right:10px;' height='14'/><span style='margin-right: 33px'>400-188-2010</span><img id='imgDemo' src='./static/img/Bitmap_1.png' width='14' style='margin-right:10px' height='14'><span style=';font-size: 14px'>021-65066038</span></p>" +
            "<div style='position:absolute;left:-45px;top:0;width:40px;height:40px;background:rgba(65,151,232,1);color:#FFF;text-align: center;line-height: 40px;font-size:18px;font-weight:bold;'>京</div>" +
            "</div>";
          // 百度地图API功能
          this.wodeMap = new BMap.Map(this.mapId); // 创建Map实例
          const point = new BMap.Point(116.289851,39.833336);
          this.wodeMap.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
          const marker = new BMap.Marker(point); // 创建标注
          this.wodeMap.addOverlay(marker); // 将标注添加到地图中
          marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
          // 添加公司信息标签
          const infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象
          const me = marker;
          marker.addEventListener("click", () => {
            me.openInfoWindow(infoWindow);
            document.getElementById("imgDemo").onload = () => {
              infoWindow.redraw(); // 防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
            };;
          });
          // 添加地图类型控件
          this.wodeMap.addControl(
            new BMap.MapTypeControl({
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
            })
          );
          this.wodeMap.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
          this.wodeMap.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        })
        .catch(err => {
          // console.log("地图加载失败");
        });
    },
    initMap() {
      loadBMap("odVtZzMi9ihkDivAWB5PIk6qGpzuk2k1")
        .then(() => {
          const sContent =            "<div style='width: 287px;position: relative'>" +
            "<h4 style='margin:0 0 5px 0;padding:0.2em 0;font-size: 20px;rgba(28,34,44,1)'>上海总部</h4>" +
            "<p style='margin-bottom:5px;line-height:1.5;font-size:12px;color:rgba(42,46,54,0.75);line-height:24px;'>上海市长江南路180号（三号线长江南路地铁站附近）</p>" +
            "<p style='color: font-size:14px;font-family:MicrosoftYaHeiUI-Bold;font-weight:bold;color:rgba(65,151,232,1);line-height:24px;font-size: 14px'><img id='imgDemo1' src='./static/img/Group.png' width='14' style='margin-right:10px;' height='14'/><span style='margin-right: 33px'>400-188-2010</span><img id='imgDemo' src='./static/img/Bitmap_1.png' width='14' style='margin-right:10px' height='14'><span style=';font-size: 14px'>021-65066038</span></p>" +
            "<div style='position:absolute;left:-45px;top:0;width:40px;height:40px;background:rgba(65,151,232,1);color:#FFF;text-align: center;line-height: 40px;font-size:18px;font-weight:bold;'>沪</div>" +
            "</div>";
          // 百度地图API功能
          this.wodeMap = new BMap.Map(this.mapId); // 创建Map实例
          const point = new BMap.Point(121.491252, 31.339003);
          this.wodeMap.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
          const marker = new BMap.Marker(point); // 创建标注
          this.wodeMap.addOverlay(marker); // 将标注添加到地图中
          marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
          // 添加公司信息标签
          const infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象
          const me = marker;
          marker.addEventListener("click", () => {
            me.openInfoWindow(infoWindow);
            document.getElementById("imgDemo").onload = () => {
              infoWindow.redraw(); // 防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
            };;
          });
          // 添加地图类型控件
          this.wodeMap.addControl(
            new BMap.MapTypeControl({
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
            })
          );
          this.wodeMap.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
          this.wodeMap.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        })
        .catch(err => {
          // console.log("地图加载失败");
        });
    }
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.initMap();
    }, 1000);
  }
};
</script>

<style lang="stylus">
.myMap
  background-color #f8f8f8
  width 100%
  .mapContent
    width 80%
    max-width 1064px
    margin 0 auto
    text-align center
    padding-bottom 83px
    .box
      position relative
      .changeItem
        position absolute
        width 40px
        height 40px
        background:rgba(65,151,232,1);
        color #FFF
        top -20px
        text-align center
        line-height 40px
        font-size:18px;
        font-family:MicrosoftYaHeiUI-Bold;
        font-weight:bold;
        right 0
        z-index 1000
        cursor pointer
      .jing
        right 65px
        background:rgba(245,166,35,1)
    .title
      font-size:32px;
      color:rgba(42,46,54,1);
      line-height:41px;
      padding-top 81px
      margin-bottom 24px
    .brief
      font-size:16px;
      color:rgba(42,46,54,0.75);
      line-height:20px;
      padding-bottom 60px
    .mapId
      div
        div
          div
            .BMap_pop
              div
                &:nth-of-type(9)
                  overflow visible !important
@media screen and (max-width: 997px)
  .myMap
    .mapContent
      padding-bottom 40px
      .title
        padding-top 40px
      .brief
        padding-bottom 30px
@media screen and (max-width: 375px)
  .myMap
    .mapContent
      width 95%
      .title
        font-size 26px
        padding 20px
        margin-bottom 0px
      .brief
        font-size 14px
</style>
