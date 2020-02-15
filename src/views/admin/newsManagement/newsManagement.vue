<template lang='pug'>
  .news-management
    .title 新闻管理
    .buttons
      Button(to="/admin/newsEdit") 添加新闻
      //- Button(@click="closeNews") 关闭新闻
    .list
      Table(:columns="colTitle",:data='newsList')
    .page
      Page(:total="pageOne.total"  @on-change="pageChange")
</template>

<script>
import { newShowQry, newDel, updateNews } from '@/api/index'

export default {
  name: "",
  data() {
    return {
      colTitle: [
        // {
        //   type: "selection",
        //   align: "center"
        // },
        // {
        //   title: "排序",
        //   key: "index"
        // },
        {
          title: "新闻名称",
          key: "title"
        },
        // {
        //   title: "类别",
        //   key: "type"
        // },
        {
          title: "状态",
          key: "isShow",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: params.row.isShow !== '0' ? "#fe5500" : "#00A854"
                  }
                },
                "●"
              ),
              h(
                "span",
                {
                  style: {
                    color: params.row.isShow !== '0' ? "#fe5500" : "#00A854"
                  }
                },
                params.row.isShow !== '0' ? "已关闭" : "已开启"
              )
            ]);
          }
        },
        {
          title: "时间",
          key: "updateTime",
          render: (h, params) => {
            return h(
              "div", 
              {},
              new Date(params.row.updateTime).Format('yyyy-MM-dd hh:mm:ss')
            );
          }
        },
        {
          title: "操作",
          key: "operation",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    margin: "0 4px",
                    color: "skyblue"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "admin/newsEdit",
                        query: params.row
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    margin: "0 4px",
                    color: "skyblue"
                  },
                  on: {
                    click: () => {
                      this.deleteNews(params.row.id);
                    }
                  }
                },
                "删除"
              ),
              h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    margin: "0 4px",
                    color: "skyblue"
                  },
                  on: {
                    click: () => {
                      this.operateStatus(params.row)
                    }
                  }
                },
                params.row.isShow !== '0' ? "开启" : "关闭"
              )
            ]);
          }
        }
      ],
      newsList: [],
      selectList: [],
      pageOne: {
        total: 0,
        limit: 10,
        page: 1
      }
    };
  },
  methods: {
    // 分页页码change
    pageChange(value) {
      this.pageOne.page = value;
      this.listNewsManageRequest();
    },
    // 查询新闻
    listNewsManageRequest() {
      let params = `pageNum=${this.pageOne.page}&pageSize=${this.pageOne.limit}`
      newShowQry(params).then(res => {
        console.log(res)
        if(res.data.code === 200 && res.data.data.records) {
          this.newsList = res.data.data.records
          this.pageOne.total = res.data.data.total
        }
      })
    },
    // 删除新闻
    deleteNews(id) {
      let params = `id=${id}`
      newDel(params).then(res => {
        if(res.data.code === 200) {
          this.$Message.success("删除成功")
          this.listNewsManageRequest()
        }
      })
    },
    // 关闭/开启新闻
    operateStatus(data) {
      let params = JSON.parse(JSON.stringify(data))
  	  params = {
    		...params,
    		isShow: params.isShow === '0' ? '1' : '0'
  	  }
      updateNews(params).then(res => {
        console.log(res)
        if(res.data.code === 200) {
          this.$Message.success("状态修改成功")
          this.listNewsManageRequest()
        }
      })
    }
  },
  created() {
    this.listNewsManageRequest();
  }
};
</script>

<style lang='stylus' scoped>
.news-management
  padding-left 20px
  position relative
  .buttons
    margin-bottom 12px
    button
      margin 0 5px
  .title
    margin 30px 0
  .list
    max-width 1100px
  .page
    position absolute
    left 700px
    bottom -80px
</style>
