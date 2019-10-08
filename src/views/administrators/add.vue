<template>
  <div class="app-container">
    <div class="form-width">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            type="text"
          />
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="form.role" placeholder="请选择用户角色">
            <el-option label="超级管理员" value="1" />
            <el-option label="经理" value="2" />
            <el-option label="部门主管" value="3" />
            <el-option label="员工" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="初始密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="初始密码 可不填 默认123456"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="cancelClick">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax'
import { Message } from 'element-ui'
import md5 from 'md5'
export default {
  data() {
    return {
      form: {
        username: '',
        role: '1',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      // 如果全部校验错误 则返回
      if (!this.validates()) return
      // 如果未输入密码 默认123456
      if (!this.form.password) this.form.password = '123456'
      // 将密码md5加密
      this.form.password = md5(this.form.password)
      // 定义参数param
      const param = { url: '/api/pro/admin/add', data: this.form }
      ajax.post(param).then((data) => {
        if (data.success === 'true') {
          this.$router.push({ path: '/administrators/list' })
        } else {
          Message.error(data.msg)
        }
      }).catch((err) => {
        Message.error(err || 'SERVER ERROR')
      })
    },
    // 校验表单
    validates() {
      const form = this.form
      let bool = false
      // 校验 - 用户名
      if (!form.username) {
        Message.error('请输入用户名')
        bool = false
      } else if (form.username.length > 16) {
        Message.error('用户名不超过16个字')
        bool = false
      } else if (/ /g.test(form.username)) {
        Message.error('用户名不得有空格')
        bool = false
      // 校验 - 角色
      } else if (!form.role) {
        Message.error('请选择角色')
        bool = false
      // 校验 - 密码
      } else if (form.password && (form.password.length < 6 || form.password.length > 15)) {
        Message.error('密码长度6~15位')
        bool = false
      } else {
        bool = true
      }
      // 返回
      return bool
    },
    cancelClick() {
      this.$router.push({ path: '/administrators/list' })
    }
  }
}
</script>

<style scope>
.form-width {width: 600px;}
@media screen and (max-width: 640px) {
  .form-width {width: auto;}
}
</style>

