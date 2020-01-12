<template lang="pug">
  div.servicesupport
    .bannerimg
      img(src="@/assets/servicesupport/image/banner_s.png")
    div.box1
      .mainbox1 服务支持
      .mainbox2 专业化服务团队， 7*24响应支持
    div.box2
      .rightbox2
        img(src="@/assets/servicesupport/image/Bitmap Copy.png")
      .leftbox2
        .lbox21 售后服务及培训内容
        .lbox211 1、软件提供免费的上门安装、调试、培训服务。
        .lbox212 2、软件提供三年全质保及免费上门维护服务。
        .lbox213 3、软件在完成首期不少于5课时培训后，在学校正式使用软件授课前期，可以根据学校要求，再进行不少于一次软件使用前的系统培训。
        .lbox214 4、对于软件故障造成的教学科研活动无法继续进行情况，我方承诺在接到反馈后1小时内实时响应，如远程无法解决问题，承诺24小时内到达现场服务，并最迟在两个工作日内提供故障的应急策略和措施。
        .lbox215 5、如由于软件本身原因,在一个工作日内无法对软件完成故障修复,本公司承诺提供同类模拟教训软件暂时应急替代使用,直至完成对故障修复为止。
        .lbox216 6、在保质期结束后，对设备维护、维修、需更换及升级零部件时，厂家需保证能够及时提供配件，用户享受成本价。
    .line1
    div.box3
      .rightbox3
        img(src="@/assets/servicesupport/image/Bitmap.png")
      .leftbox3
        .lbox31 应急维修时间安排，不能修复时采取的措施
        .lbox311 1、对于软件故障造成的教学科研活动无法继续进行情况，我方承诺在接到反馈后实时响应，如远程无法解决问题，承诺24小时内到达现场服务，并最迟在一个工作日内提供故障的应急策略和措施。
        .lbox312 2、如由于软件本身原因,在一个工作日内无法对软件完成故障修复,本公司承诺提供同类模拟教训软件暂时应急替代使用,直至完成对故障修复为止。
    .line1
    div.box4
      .rightbox4
        img(src="@/assets/servicesupport/image/undraw_pair_programming_njlp.png")
      .leftbox4
        .lbox41 免费培训计划
        .lbox411 1、软件提供免费的上门安装、调试、培训服务。
        .lbox412 2、可以根据学校的实训实验要求，在实训课开始前，可再进行一次课前免费上门系统培训。
        .lbox413 3、在售后服务期内，可以享受长期免费网络及电话培训服务。
        .lbox414 4、培训人员及培训人数由使用方决定。
    .line1
    div.box5
      .rightbox5
        img(src="@/assets/servicesupport/image/Bitmap Copy 5.png")
      .leftbox5
        .lbox51 其它服务承诺
        .lbox511 1、保证软件的免费维护、升级服务，包括新版本的上门安装、模块的更新、修正、调整，系统的调优、纠错等服务。
        .lbox512 2、提供7*24小时的电话及网络支持服务。
        .lbox513 3、在免费升级期限内，承诺可结合学校实训课程，根据甲方老师的要求对软件进行二次开发(针对课程要求)，以满足学校的特色教学，实现量身定制特色教学软件。
        .lbox514 4、在免费升级期限内，如遇校方在不影响软件产品界面统一性、通用性的情况下，针对软件功能技术模块提出的进一步的调整要求，本公司提供免费提供修改支持。
</template>
<script>
export default {
  components: {
  }
};
</script>
<style lang="stylus">
.servicesupport {
  margin: 0;
  padding: 0;

  >.bannerimg {
    margin: 0;
    padding: 0;

    // height: 400px;
    // background: blue;
    img {
      display: block;
      width: 100%;
      // height: 100%;
    }
  }

  >.box1 {
    width: 100%;
    height: 88px;
    margin-top: 60px;
    margin-bottom 42px
    .mainbox1 {
      width: 128px;
      height: 41px;
      font-family: MicrosoftYaHeiUI;
      color: rgba(42, 46, 54, 1);
      font-size: 32px;
      text-align: center;
      margin: 0 auto;
    }

    .mainbox2 {
      width: 704px;
      height: 20px;
      font-family: MicrosoftYaHeiUI;
      color: rgba(42, 46, 54, 0.75);
      line-height: 20px;
      text-align: center;
      margin: 27px auto;
    }
  }

  >.box2, .box4 {
    width: 1000px;
    overflow: hidden;
    margin: 100px auto;
    margin-bottom: 90px;

    .leftbox2, .leftbox4 {
      width: 500px;
      // height: 350px;
      // margin-bottom 60px
      float: left;

      .lbox21, .lbox41 {
        // font-weight: bolder;
        margin-bottom: 15px;
        font-size: 16px;
        font-family: MicrosoftYaHeiUI;
        color: rgba(28, 34, 44, 1);
        line-height: 24px;
      }

      .lbox211, .lbox212, .lbox213, .lbox214, .lbox215, .lbox216, .lbox411, .lbox412, .lbox413, .lbox414 {
        font-size: 14px;
        font-family: MicrosoftYaHeiUI;
        color: rgba(42, 46, 54, 0.75);
        line-height: 24px;
      }
    }

    .rightbox2, .rightbox4 {
      width: 440px;
      height: 312px;
      float: right;

      img {
        margin-left: 35px;
        width: 375px;
        height: 256px

      }
    }
  }

  >.line1 {
    max-width: 1170px;
    height: 1px;
    margin: 10px auto;
    background: #D2DDEC;
  }

  >.box3, .box5 {
    width: 1000px;
    overflow: hidden;
    margin: 100px auto;
    margin-bottom: 90px;

    .leftbox3, .leftbox5 {
      width: 500px;
      // height: 350px;
      float: right;

      .lbox31, .lbox51 {
        // font-weight: bolder;
        margin-bottom: 15px;
        font-size: 16px;
        font-family: MicrosoftYaHeiUI;
        color: rgba(28, 34, 44, 1);
        line-height: 24px;
      }

      .lbox311, .lbox312, .lbox511, .lbox512, .lbox513, .lbox514 {
        font-size: 14px;
        font-family: MicrosoftYaHeiUI;
        color: rgba(42, 46, 54, 0.75);
        line-height: 24px;
      }
    }

    .rightbox3, .rightbox5 {
      width: 440px;
      height: 312px;
      float: left;

      img {
        margin-left: 35px;
        width: 375px;
        height: 256px

      }
    }
  }
}

@media screen and (max-width: 997px) {
  .servicesupport {
    >.bannerimg {
      width: 100%;

      img {
        display: block;
        width: 100%;
      }
    }

    >.box1 {
      .mainbox1 {
        width: 104px;
        height: 36px;
        font-size: 26px;
        font-family: MicrosoftYaHeiUI;
        color: rgba(42, 46, 54, 1);
        line-height: 33px;
      }

      .mainbox2 {
        width: 345px;
        height: 48px;
        font-size: 14px;
        margin: 4px auto;
        font-family: MicrosoftYaHeiUI;
        color: rgba(42, 46, 54, 0.75);
        line-height: 24px;
      }
    }

    >.box2, .box4 {
      width: 100%;
      // height: 680px;
      margin: 52px auto;
      margin-bottom: 0;

      .leftbox2, .leftbox4 {
        width: 100%;
        overflow: hidden;
        margin: 0 auto;
        padding: 20px;
        padding-bottom: 0px;
        float: left;

        .lbox21, .lbox41 {
          // font-weight: bolder;
          font-size: 16px;
          font-family: MicrosoftYaHeiUI;
          color: rgba(28, 34, 44, 1);
          line-height: 24px;
        }

        .lbox211, .lbox212, .lbox213, .lbox214, .lbox215, .lbox216, .lbox411, .lbox412, .lbox413, .lbox414 {
          font-size: 14px;
          font-family: MicrosoftYaHeiUI;
          color: rgba(42, 46, 54, 0.75);
          line-height: 24px;
        }
      }

      .rightbox2, .rightbox4 {
        width: 100%;
        height: 260px;
        margin: 0 auto;
        float: right;
        text-align: center;

        img {
          margin: 0 auto;
        }
      }
    }

    >.line1 {
      max-width: 85%;
      height: 1px;
      margin: 10px auto;
      background: #D2DDEC;
    }

    >.box3, .box5 {
      width: 100%;
      // height: 680px;
      margin: 52px auto;
      margin-bottom: 0;

      .leftbox3, .leftbox5 {
        width: 100%;
        overflow: hidden;
        margin: 50px auto;
        padding: 20px;
        padding-bottom: 0px;
        float: left;

        .lbox31, .lbox51 {
          // font-weight: bolder;
          font-size: 16px;
          font-family: MicrosoftYaHeiUI;
          color: rgba(28, 34, 44, 1);
          line-height: 24px;
        }

        .lbox311, .lbox312, .lbox511, .lbox512, .lbox513, .lbox514 {
          font-size: 14px;
          font-family: MicrosoftYaHeiUI;
          color: rgba(42, 46, 54, 0.75);
          line-height: 24px;
        }
      }

      .rightbox3, .rightbox5 {
        width: 100%;
        height: 260px;
        margin: 0 auto;
        float: right;
        text-align: center;

        img {
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
