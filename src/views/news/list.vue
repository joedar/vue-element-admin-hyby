<template>
  <div class="app-container">
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="id" label="ID" />
      <el-table-column prop="title" label="新闻标题" />
      <el-table-column prop="imageType" label="封面图片类型" />
      <el-table-column prop="image" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="width: 120px;">
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="日期" />
      <!-- <el-table-column prop="contentTxt" label="内容" /> -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="modifyClick(scope.row)">修改</el-button>
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
</template>

<script>
// 引入ajax请求
import ajax from '@/utils/ajax'
export default {
  name: 'NewsList',
  data() {
    return {
      page: 1,
      pageSize: 15,
      list: [],
      totalCount: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      ajax.post({
        url: '/api/pro/news/list',
        data: { page: this.page, pageSize: this.pageSize }
      }).then((data) => {
        this.list = data.data.list
      }).catch((err) => {
        console.log(err)
      })
    },
    // 修改点击事件
    modifyClick(e) {
      const id = Number(e.id)
      this.$router.push({ path: `/news/modify/${id}` })
    },
    // 删除点击事件
    deleteClick(e) {
      const id = Number(e.id)
      this.$confirm('确定要删除此条新闻?', '提示', {
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
      const param = { url: '/api/pro/news/del', data: { id }}
      ajax.post(param).then((data) => {
        this.page = 1
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
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
