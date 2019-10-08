<template>
  <div class="app-container">
    <div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column fixed prop="id" label="ID" />
        <el-table-column prop="openid" label="用户微信ID">
          <template slot-scope="scope">
            {{ scope.row.openid.substring(0, 10) + '***' }}
          </template>
        </el-table-column>
        <el-table-column prop="avatarUrl" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" style="width: 40px;">
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
            {{ scope.row.gender ? scope.row.gender === 1 ? '男' : '女' : '未知' }}
          </template>
        </el-table-column>
        <el-table-column label="地区">
          <template slot-scope="scope">
            {{ scope.row.country }} - {{ scope.row.province }} - {{ scope.row.city }}
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
  name: 'WechatUsers',
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
      const param = {
        url: '/api/pro/wx/user.list',
        data: { page: this.page, pageSize: this.pageSize }
      }
      ajax.post(param).then((data) => {
        if (data.success === 'true') {
          console.log(data.data.list)
          this.list = data.data.list
          this.totalCount = data.data.totalCount
        }
      }).catch((err) => {
        this.$message(err || 'SERVER ERROR')
      })
    }
  }
}
</script>
