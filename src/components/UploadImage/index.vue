<template>
  <div class="upload-image">
    <div v-if="url">
      <div class="image" :style="{background : 'url('+url+') 0% 0% / cover no-repeat'}">
        <div class="options">
          <svg-icon icon-class="preview" alt="预览" @click="dialogVisibleClick" />
          <svg-icon icon-class="trash" alt="删除" @click="deleteImageClick" />
        </div>
      </div>
    </div>
    <div v-else>
      <el-upload
        action="/api/upload/image"
        :show-file-list="false"
        :before-upload="handleBeforeUpload"
        :on-success="handleUploadSuccess"
        :limit="1"
      >
        <el-button type="primary">上传图片</el-button>
      </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="url" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  data() {
    return {
      dialogVisible: false,
      url: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      // :on-remove="handleRemove"
      console.log(file, fileList)
    },
    // 上传成功
    handleUploadSuccess(res) {
      this.url = res.data.url
    },
    // 弹出层预览图片
    dialogVisibleClick() {
      this.dialogVisible = true
    },
    // 删除图片
    deleteImageClick() {
      this.url = ''
    },
    // 上传之前的处理
    handleBeforeUpload(file) {
      const type = file.type
      if (!/image\/(jpeg|gif|png)/.test(type)) {
        this.$message('图片格式不正确')
        return false
      }
      const size = file.size
      if (size > 5 * 1024 * 1024) {
        this.$message('图片不得超过5M')
        return false
      }
    }
  }
}
</script>

<style scoped>
.upload-image {width: 180px;}
@media screen and (max-width: 640px) {
  .upload-image {width: 100%;}
}
.upload-image .image {width: 100%;}
.upload-image .image {padding-bottom: 100%; position: relative; border-radius: .4em; overflow: hidden;}
.upload-image .image > .options {position: absolute; left: -9999px; top: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, .5);}
.upload-image .image > .options {display: -webkit-flex; display: flex; justify-content: center; align-items: center;}
.upload-image .image > .options > * {width: 11%; height: 11%; margin: 0 .5em; color: #fff; cursor: pointer;}
.upload-image .image:hover > .options {left: 0;}
</style>
