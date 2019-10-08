<template>
  <div class="app-container">
    <el-table :data="userListData.list" border style="width: 100%">
      <el-table-column fixed prop="id" label="ID" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="active" label="状态" />
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
        :total="userListData.totalCount"
        :page-size="pageSize"
      />
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax'
export default {
  data() {
    return {
      page: 1,
      pageSize: 15,
      userListData: {}
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      const formData = { page: this.page, pageSize: this.pageSize }
      this.$store.dispatch('user/getUserList', formData).then((res) => {
        this.userListData = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    // 删除操作点击事件
    deleteClick(row) {
      const id = Number(row.id)
      const role = Number(row.role)
      if (role > 1) {
        this.$message('非超级管理员无权操作')
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
      const param = { url: '/api/pro/admin/del', data: { id }}
      ajax.post(param).then((data) => {
        if (data.success === 'true') {
          this.page = 1
          this.fetchList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err || 'SERVER ERROR'
        })
      })
    },
    // 修改操作点击事件
    modifyClick(row) {
      const id = Number(row.id)
      const role = Number(row.role)
      if (role > 1) {
        this.$message('非超级管理员无权操作')
        return
      }
      this.$router.push({ path: `/administrators/modify/${id}` })
    }
  }
}
</script>

<style>

</style>

