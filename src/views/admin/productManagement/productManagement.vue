<template lang='pug'>
  .product-management
    .title3 产品管理
    .buttons
      Button(@click="addpro") 添加产品
      Button(@click="modal1 = true") 添加类别
      Button(@click="categoryclick") 删除类别
    .list3
      Table.table(:columns="colTitle" :data="productList")
      Page.page(@on-change="handleCurrentChange" :total="pageData.totalRecords"
         :page-size="5" :current="pageData.pageNo" show-elevator)
      Modal(v-model="modal1" title="添加类别" width="30" @on-ok="addcategory('addfromclass')")
        Form.form(ref='addfromclass' :model='addfromclass',:label-width='0' :rules="formRules")
          FormItem 大类型
            RadioGroup(v-model="addfromclass.bigtype" style="margin-left:10px")
              Radio(label="公共管理类") 公共管理类
              Radio(label="思想政治类") 思想政治类
          FormItem(prop='addfrom') 小类型
            Input(v-model='addfromclass.addfrom',placeholder='请输入类别名称')
      Modal(v-model="modal2" title="删除类别" width="30" @on-ok="")
        RadioGroup(v-model="addfromclass.bigtype" style="margin-left:10px;margin-bottom:15px" @on-change="onchange")
          Radio(label="公共管理类") 公共管理类
          Radio(label="思想政治类") 思想政治类
        Table.table(:columns="colTitle2" :data="categorylist")

</template>
<script>
export default {
  name: "",
  data() {
    return {
      modal2: false,
      page: 1,
      formRules: {
        // 表单正则
        addfrom: [
          { required: true, message: "请输入类别名称", trigger: "blur" },
          {
            trigger: "blur"
          }
        ]
      },
      categoryform: {
        littlecategory: ""
      },
      addfromclass: {
        addfrom: "",
        bigtype: "公共管理类"
      },
      modal1: false,
      pageData: {}, // 表格分页数据
      colTitle2: [
        {
          title: "排序",
          type: "index"
        },
        {
          title: "小类别名称",
          key: "category_name"
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
                      this.categorydelete(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      colTitle: [
        {
          title: "排序",
          type: "index"
        },
        {
          title: "产品名称",
          key: "newsp_title"
        },
        {
          title: "类别",
          key: "newsp_category"
        },
        {
          title: "显示时间",
          key: "newsp_createTime",
          render: (h, params) => {
            return h("div", [
              h("span", {}, params.row.newsp_close ? "-" : params.row.newsp_createTime)
            ]);
          }
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
                      this.confirmdelete(params.row);
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
                      const data = {
                        id: params.row.id,
                        newsm_close: !params.row.newsp_close
                      };
                      this.updataProduct(data, () => {
                        params.row.newsp_close = !params.row.newsp_close;
                      });
                    }
                  }
                },
                params.row.newsp_close ? "开启" : "关闭"
              )
            ]);
          }
        }
      ],
      productList: [],
      categorylist: []
    };
  },
  methods: {
    // 删除类别
    categorydelete(row) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "<p>你确定要删除这些数据吗?</p>",
        onOk: () => {
          const ids = [];
          ids.push(row.category_name);
          const data = {};
          data.ids = JSON.stringify(ids);
          this.$http.deletecategory(data).then(res => {
            if (res.data.success) {
              this.$Message.success("删除成功");
              this.findcategory();
            } else {
              this.$Message.error(res.data.message);
            }
          });
        }
      });
    },
    onchange() {
      // console.log(this.addfromclass.bigtype)
      this.findcategory();
    },
    categoryclick() {
      this.modal2 = true;
      this.findcategory();
    },
    // 查询类别
    findcategory() {
      const data = {
        category_categoryType: this.addfromclass.bigtype,
        pageNo: 1,
        pageSize: 20
      };
      this.$http.findcategory(data).then(res => {
        if (res.data.success) {
          this.categorylist = res.data.data.list;
          // console.log(this.addfrom);
          this.$forceUpdate();
          // this.$nextTick(() => {
          //   this.addfrom.category = this.activeCategory;
          // });
        }
      });
    },
    addpro() {
      this.$router.push({
        path: "/admin/addOrEditorProduct"
      });
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page;
      this.listNewsProductRequest();
    },
    // 添加类别
    addcategory(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = {
            category_name: this.addfromclass.addfrom,
            category_categoryType: this.addfromclass.bigtype
          };
          this.$http.addcategory(data).then(res => {
            if (res.data.success) {
              this.$Message.success("添加成功");
              this.addfromclass = {
                addfrom: "",
                bigtype: "公共管理类"
              };
              this.$forceUpdate();
            }
          });
        } else {
          this.$Message.error("请填写");
        }
      });
    },
    // 关闭
    updataProduct(data, cb) {
      this.$http.updataProduct(data).then(res => {
        if (res.data.success) {
          if (typeof cb === "function") {
            cb();
          }
        }
      });
    },
    // 弹出删除产品模态框
    confirmdelete(row) {
      this.$Modal.confirm({
        title: "系统提示",
        content: "<p>你确定要删除这些数据吗?</p>",
        onOk: () => {
          this.deleteproduct(row);
        }
      });
    },
    // 删除产品
    deleteproduct(row) {
      // console.log(row.id)
      const data = {
        ids: [row.id]
      };
      data.ids = JSON.stringify(data.ids);
      this.$http.deleteproduct(data).then(res => {
        if (res.data.success) {
          this.$Message.success("删除成功");
          this.listNewsProductRequest();
        } else {
          this.$Message.error("删除失败");
        }
      });
    },
    // 查询产品
    listNewsProductRequest() {
      this.$http
        .listNewsProductRequest({
          pageNo: this.page,
          pageSize: 5
        })
        .then(res => {
          if (res.data.success) {
            this.productList = res.data.data.list;
            this.pageData = res.data.data;
          }
        });
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
      margin-top: 40px;
      float: right;
    }

    .table {
      margin-top: 20px;
    }
  }
}
</style>
