<template>
  <div class="app-container">
    <div class="form-width">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="新闻标题">
          <el-input v-model="form.title" placeholder="请输入产品标题，30字以内" type="text" />
        </el-form-item>
        <el-form-item label="封图类型">
          <el-select v-model="form.imageType" placeholder="请选择封面图片类型">
            <el-option label="普通" value="normal" />
            <el-option label="大图" value="big" />
            <el-option label="无封面图" value="none" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.imageType !== 'none'" label="封面图片">
          <UploadImage ref="uploadImage" />
        </el-form-item>
        <el-form-item label="新闻内容">
          <CKeditor ref="ckeditor" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SUBMITCLICK">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入上传图片组件(单张)
import UploadImage from '@/components/UploadImage'
// 引入CKEditor组件
import CKeditor from '@/components/CKeditor'
// 引入ajax请求
import ajax from '@/utils/ajax'

export default {
  name: 'NewsAdd',
  components: { UploadImage, CKeditor },
  data() {
    return {
      // 用来渲染页面的数据
      form: {
        title: '',
        image: '',
        imageType: 'normal',
        content: ''
      },
      // 用户提交后端的数据
      formData: {}
    }
  },
  methods: {
    // ---------------
    // 提交按钮点击事件
    // ---------------
    SUBMITCLICK() {
      // 校验 - 产品标题
      const title = this.form.title
      if (!title) {
        this.$message('请输入产品标题')
        return
      } else if (title.length > 30) {
        this.$message('产品标题不得超过30个字')
        return
      }
      this.formData.title = title

      this.formData.imageType = this.form.imageType

      if (this.form.imageType !== 'none') {
        // 校验 - 封面图片
        const image = this.$refs.uploadImage.url
        if (!image) {
          this.$message('请上传封面图片')
          return
        }
        this.formData.image = image
      }

      // 校验 - 新闻内容
      const content = this.$refs.ckeditor.editorData
      if (!content) {
        this.$message('请输入新闻内容')
        return
      }
      this.formData.content = content
      // 提取html中的文本
      this.formData.contentTxt = content.replace(/\s*/g, '').replace(/<[^>]+>/g, '').replace(/↵/g, '').replace(/[\r\n]/g, '').substring(0, 150)

      console.log(this.formData)
      this.add()
    },
    add() {
      const param = { url: '/api/pro/news/add', data: this.formData }
      ajax.post(param).then((data) => {
        this.$router.push({ path: '/news/list' })
      }).catch((err) => {
        this.$message(err || 'SERVER ERROR')
      })
    }
  }
}
</script>

<style scope>
.form-width {
  width: 900px;
}
@media screen and (max-width: 640px) {
  .form-width {
    width: auto;
  }
}
</style>

