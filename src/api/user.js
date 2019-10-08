import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/pro/admin/login',
    method: 'post',
    data
  })
}
// 该用户信息
export function getInfo() {
  return request({
    url: '/pro/admin/user.info',
    method: 'get'
  })
}
// 用户退出登录
export function logout() {
  return request({
    url: '/pro/admin/logout',
    method: 'post'
  })
}
// 获取用户列表
export function getUserList(data) {
  return request({
    url: '/pro/admin/list',
    method: 'post',
    data
  })
}

// 添加用户

// 删除用户

// 更新用户
