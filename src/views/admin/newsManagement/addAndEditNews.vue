<template lang='pug'>
  div.add-and-edit-news
    .nav 新闻管理 /
      span 新闻编辑
    .title 新闻管理
    .news-content
      Form(ref="form",:label-width="80" :model="formData" :rules="ruleValidate")
        FormItem(label="封面：")
          <span slot="label"><span class="xing">*</span><span>封面：</span></span>
          Upload(ref="upload" :action="upLoadUrl",:before-upload="handleUpload", :default-file-list="defaultFileList" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError" :on-success="handleSuccess" :on-remove="handleRemove")
            Button 选择文件
        FormItem(label="时间：" prop="newTime")
          DatePicker(type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date" v-model="formData.newTime")
        FormItem(label="标题：" prop="title")
          Input(v-model="formData.title" placeholder="enter title")
        FormItem(label="摘要：" prop="remark")
          Input(type="textarea" v-model="formData.remark" :autosize="{minRow: 2, maxRow: 4}")
        FormItem(label="内容：" prop="des")
          quill-editor(v-model="formData.des",:options="editorOption")
        //FormItem(label="排序")
          //Input(v-model="formData.sort" placeholder="请输入数字")
    .buttons
      Button(type="default" to="/admin/newsManagement") 取消
      Button(type="success" :loading="loading" @click="savaPage") 保存
</template>

<script>
import { addNews, upLoadUrl, deleteFile, newInfo, fileDetail, updateNews } from '@/api/index'
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; // 引入编辑器
// quill编辑器的字体
const fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif"
];
const Font = Quill.import("formats/font");
Font.whitelist = fonts; // 将字体加入到白名单
Quill.register(Font, true);
export default {
  name: "",
  data() {
    return {
      formData: {
        newTime: "",
        title: "",
        des: "",
        pid: "",
        remark: ""
      },
      ruleValidate: {
        newTime: [
          {
            required: true,
            type: 'date',
            message: '不能为空',
            trigger: 'change'
          }
        ],
        title: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        des: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], // 列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: fonts }], // 字体
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除字体样式
            ["image", "video"] // 上传图片、上传视频
          ]
        },
        theme: "snow"
      },
      loading: false,
      upLoadUrl: '',
      uploadList: [],
      defaultFileList: [],
      isEdit: false // 页面是否为编辑页面
    };
  },
  methods: {
    // 删除文件
    handleRemove(file) {
      console.log(file)
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
    // 文件上传前
    handleUpload(file) {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Message.error("请上传且仅上传一张封面")
      }
      return check;
    },
    // 上传文件格式失败
    handleFormatError() {
      this.$Message.error("请上传图片文件")
    },
    // 点击保存
    savaPage() {
      if(this.uploadList.length !== 1) {
        return this.$Message.error("请上传且仅上传一张封面")
      }
      this.$refs.form.validate(valid => {
        if(valid) {
          let params = JSON.parse(JSON.stringify(this.formData))
          params.newTime = new Date(params.newTime).Format("yyyy-MM-dd hh:mm:ss")
          if(this.isEdit) {
            // 修改
            this.loading = true
            updateNews(params).then(res => {
              this.loading = false;
              if(res.data.code === 200) {
                this.$Message.success("修改成功")
                this.$router.push({
                  path: '/admin/newsManagement'
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
            addNews(params).then(res => {
              this.loading = false
              if(res.data.code === 200) {
                this.$Message.success("创建成功")
                this.$router.push({
                  path: '/admin/newsManagement'
                })
              }else{
                this.$Message.error("创建失败")
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
    // 根据Id查询新闻
    getNewsManageById(id) {
      let params = `id=${id}`
      newInfo(params).then(res => {
        console.log(res)
        if(res.data.code === 200 && res.data.data) {
          this.formData = res.data.data
          if(res.data.data.pid) {
            this.getFileById()
          }
        }
      })
    },
  },
  created() {
    this.upLoadUrl = upLoadUrl
    if (this.$route.query.id) {
      this.getNewsManageById(this.$route.query.id);
      this.isEdit = true;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>

<style lang='stylus' scoped>
.add-and-edit-news
  padding-left 40px
.nav
  margin-top 10px
  font-size 14px
  color #999
  span
    color #1e1e1e
.title
  font-size 20px
  margin-top 20px
  margin-bottom 20px
.news-content
  width 70%
.buttons
  margin-bottom 20px
  padding-left 80px
  button
    margin 5px
.ivu-alert
  width 280px

.xing {
  color: red;
  vertical-align: middle;
  margin-right: 4px;
  font-size: 16px;
}
</style>
