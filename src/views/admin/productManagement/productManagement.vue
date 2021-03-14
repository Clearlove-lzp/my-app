<template lang='pug'>
  .product-management
    .title3 产品管理
    .buttons
      Button(to="/admin/addOrEditorProduct") 添加产品
      //- Button(@click="modal1 = true") 添加类别
      //- Button(@click="categoryclick") 删除类别
    .list3
      Table.table(:columns="colTitle" :data="productList")
      Page.page(@on-change="handleCurrentChange" :total="pageOne.total"
         :page-size="pageOne.limit" :current="pageOne.page")
</template>

<script>
import { caseShowQry, caseUpdate, caseDel } from '@/api/index'

export default {
  name: "",
  data() {
    return {
      pageOne: {
        total: 0,
        limit: 10,
        page: 1
      },
      colTitle: [
        // {
        //  title: "排序",
        //  type: "index"
        // },
        {
          title: "产品标题",
          key: "title"
        },
        {
          title: "类别",
          key: "type",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                },
                ["医院服务类", "政府机关", "企事业办公楼", "公共服务类"][
                params.row.type === '1'
                  ? "0"
                  : params.row.type === '2'
                  ? "1"
                  : params.row.type === "3"
                  ? "2"
                  : params.row.type === "4"
                  ? "3"
                  : "0"
                ]
              )
            ]);
          }
        },
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
          title: "创建时间",
          key: "createTime",
        },
        {
          title: "操作",
          name: "operation",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    cursor: "pointer",
                    margin: "0 4px",
                    color: "skyblue"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/admin/addOrEditorProduct",
                        query: {
                          id: params.row.id
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    cursor: "pointer",
                    margin: "0 4px",
                    color: "skyblue"
                  },
                  on: {
                    click: () => {
                      this.deleteProduct(params.row.id);
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
      productList: [],
    };
  },
  methods: {
    // 分页
    handleCurrentChange(value) {
      this.pageOne.page = value;
      this.listNewsProductRequest();
    },
    // 关闭/开启案例
    operateStatus(data) {
      let params = JSON.parse(JSON.stringify(data))
      params = {
        ...params,
        isShow: params.isShow === '0' ? '1' : '0'
      }
      caseUpdate(params).then(res => {
        console.log(res)
        if(res.data.code === 200) {
          this.$Message.success("状态修改成功")
          this.listNewsProductRequest()
        }
      })
    },
    // 删除产品
    deleteProduct(id) {
      let params = `id=${id}`
      caseDel(params).then(res => {
        if(res.data.code === 200) {
          this.$Message.success("删除成功")
          this.listNewsProductRequest()
        }
      })
    },
    // 查询产品
    listNewsProductRequest() {
      let params = `pageNum=${this.pageOne.page}&pageSize=${this.pageOne.limit}&type=0`
      caseShowQry(params).then(res => {
        if(res.data.code === 200 && res.data.data.records) {
          this.pageOne.total = res.data.data.total
          this.productList = res.data.data.records
        }
      })
    }
  },
  created() {
    this.listNewsProductRequest();
  }
};
</script>

<style lang='stylus' scope>
.product-management {
  padding-left: 20px;

  .buttons {
    margin-bottom: 12px;

    button {
      margin: 0 5px;
    }
  }

  .title3 {
    margin: 30px 0;
    // font-size 36px
  }

  .list3 {
    max-width: 1100px;

    .page {
      margin-top: 30px;
      margin-bottom: 30px;
      float: right;
      margin-right: 40px;
    }

    .table {
      margin-top: 20px;
    }
  }
}
</style>
