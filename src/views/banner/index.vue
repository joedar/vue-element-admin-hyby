<template>
  <div class="app-container">
    <div class="upload-button">
      <el-upload
        action="/api/upload/image"
        :show-file-list="false"
        :before-upload="handleBeforeUpload"
        :on-success="handleUploadSuccess"
        :limit="1"
      >
        <el-button type="primary">添加Banner图片</el-button>
      </el-upload>
    </div>
    <div class="banner-list">
      <el-table :data="list" border style="width: 100%">
        <el-table-column fixed prop="id" label="ID" />
        <el-table-column prop="image" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.image" style="width: 120px;">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click.native.prevent="modifyClick(scope.row)">修改</el-button> -->
            <el-button type="text" size="small" @click.native.prevent="deleteClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next, total"
          :total="totalCount"
          :page-size="pageSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 引入ajax请求
import ajax from '@/utils/ajax'
export default {
  name: 'Banner',
  data() {
    return {
      image: '',
      page: 1,
      pageSize: 15,
      list: [],
      totalCount: 0
    }
  },
  mounted() {
    this.imageList()
  },
  methods: {
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
    },
    // 上传成功
    handleUploadSuccess(res) {
      this.image = res.data.url
      // 添加图片
      this.imageAdd()
    },
    // 添加图片
    imageAdd() {
      const param = {
        url: '/api/pro/banner/add',
        data: { image: this.image }
      }
      ajax.post(param).then((data) => {
        if (data.success === 'true') {
          this.image = ''
          this.imageList()
        }
      }).catch((err) => {
        this.$message(err || 'SERVER ERROR')
      })
    },
    imageList() {
      const param = {
        url: '/api/pro/banner/list',
        data: { page: this.page, pageSize: this.pageSize }
      }
      ajax.post(param).then((data) => {
        if (data.success === 'true') {
          this.list = data.data.list
          this.totalCount = data.data.totalCount
        }
      }).catch((err) => {
        this.$message(err || 'SERVER ERROR')
      })
    },
    deleteClick(row) {
      const id = Number(row.id)
      console.log(id)
      this.$confirm('确定要删除此图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteFn(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteFn(id) {
      const param = { url: '/api/pro/banner/del', data: { id }}
      ajax.post(param).then((data) => {
        if (data.success === 'true') {
          this.image = ''
          this.page = 1
          this.imageList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err || 'SERVER ERROR'
        })
      })
    }
  }
}
</script>

<style scoped>
.banner-list {margin-top: 15px;}
</style>
