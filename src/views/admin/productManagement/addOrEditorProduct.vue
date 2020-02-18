<template lang="pug">
  div.add-and-edit-pro
    .nav1 产品管理 /
      span 产品编辑
    .title1 产品管理
    .pro-content
      Form(:model='formData' ref="form" :rules="formRules" :label-width="80")
        FormItem(label="封面：")
          <span slot="label"><span class="xing">*</span><span>封面：</span></span>
          Upload(ref="upload" :action="upLoadUrl",:before-upload="handleUpload"  :default-file-list="defaultFileList" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError" :on-success="handleSuccess" :on-remove="handleRemove")
            Button 选择文件
        FormItem(label="类别：" prop="type")
          Select(v-model="formData.type" style="width:200px")
            Option(v-for="(v,index) in categorylist",:key="index",:value="v.value") {{v.name}}
        FormItem(label="标题：" prop="title")
          Input(v-model="formData.title" placeholder="请输入标题" style="width:700px")
        //- FormItem(label="摘要：" prop="remark")
        //-   Input(type="textarea" v-model="formData.remark" placeholder="请输入摘要" style="width:700px")
        FormItem(label="内容：" prop="des")
          quill-editor(v-model="formData.des" style="width:700px")
        //- FormItem 排序
        //-   Input(v-model="formData.seq" placeholder="请输入序号0-999" style="width:500px;margin-left:20px")
    .buttons
      Button(type="default" to="/admin/productManagement") 取消
      Button(type="success" :loading="loading" @click="savaPage") 保存
</template>

<script>
import { upLoadUrl, deleteFile, caseAdd, caseInfo, fileDetail, caseUpdate } from '@/api/index'
export default {
  data() {
    return {
      upLoadUrl: "",
      uploadList: [],
      loading: false,
      defaultFileList: [],
      isEdit: false, // 页面是否为编辑页面
      formRules: {
        // 表单正则
        type: [
          { required: true, message: "请输入类别名称", trigger: "change" },
        ],
        des: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
        ]
        // seq: [
        //   { required: true, message: "请输入序号", trigger: "blur" },
        // ]
      },
      categorylist: [
        {
          name: '医院服务类',
          value: '1'
        },
        {
          name: '政府机关',
          value: '2'
        },
        {
          name: '企事业办公楼',
          value: '3'
        },
        {
          name: '公共服务类',
          value: '4'
        },
      ],
      formData: {
        type: "",
        des: "",
        title: "",
        pid: ""
      },
    };
  },
  methods: {
    // 删除文件
    handleRemove(file) {
      let params = `id=${file.response.data}`
      deleteFile(params).then(res => {
        if(res.data.code === 200) {
          this.$Message.success("文件删除成功")
        }
      })
    },
    // 文件上传成功
    handleSuccess(file) {
      this.formData.pid = file.data
      this.$Message.success("上传成功")
    },
    // 上传文件格式失败
    handleFormatError() {
      this.$Message.error("请上传图片文件")
    },
    // 文件上传前
    handleUpload(file) {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Message.error("请上传且仅上传一张封面")
      }
      return check;
    },
    // 根据文件id查询文件
    getFileById() {
      let params = `ids=${this.formData.pid}`
      fileDetail(params).then(res => {
        console.log(res)
        if(res.data.code === 200 && res.data.data && res.data.data.length > 0) {
          this.defaultFileList = [
            {
              name: res.data.data[0].fileName,
              url: res.data.data[0].filePath,
              response: {
                id: res.data.data[0].id
              }
            }
          ]
          this.$nextTick(() => {
            this.uploadList = this.$refs.upload.fileList;
          })
        }
      })
    },
    // 根据Id查询产品
    requestidProduct(id) {
      let params = `id=${id}`
      caseInfo(params).then(res => {
        console.log(res)
        if(res.data.code === 200 && res.data.data) {
          this.formData = res.data.data
          if(res.data.data.pid) {
            this.getFileById()
          }
        }
      })
    },
    // 添加产品
    savaPage() {
      if(this.uploadList.length !== 1) {
        return this.$Message.error("请上传且仅上传一张封面")
      }
      this.$refs.form.validate(valid => {
        if(valid) {
          let params = JSON.parse(JSON.stringify(this.formData))
          if(this.isEdit) {
            // 修改
            this.loading = true
            caseUpdate(params).then(res => {
              this.loading = false;
              if(res.data.code === 200) {
                this.$Message.success("修改成功")
                this.$router.push({
                  path: '/admin/productManagement'
                })
              }else {
                this.$Message.error("修改失败")
              }
            }, err => {
              this.loading = false;
              this.$Message.error("修改失败")
            })
          }else {
            // 创建
            params.isShow = '0';
            this.loading = true
            caseAdd(params).then(res => {
              this.loading = false
              if(res.data.code === 200) {
                this.$Message.success("创建成功")
                this.$router.push({
                  path: '/admin/productManagement'
                })
              }else {
                this.$Message.success("创建失败")
              }
            }, err => {
              this.loading = false;
              this.$Message.error("创建失败")
            })
          }
        }else {
          this.$Message.error("请填写完整")
        }
      })
    },
  },
  created() {
    this.upLoadUrl = upLoadUrl
    if (this.$route.query.id) {
      this.requestidProduct(this.$route.query.id);
      this.isEdit = true;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>

<style lang="stylus" scoped>
.add-and-edit-pro
  padding-left 40px
.nav1
  margin-top 10px
  font-size 14px
  color #999
  span
    color #1e1e1e
.title1
  font-size 20px
  margin-top 20px
  margin-bottom 20px
.pro-content
  width 70%
.buttons
  padding-left 80px
  button
    margin 5px

.xing {
  color: red;
  vertical-align: middle;
  margin-right: 4px;
  font-size: 16px;
}
</style>
