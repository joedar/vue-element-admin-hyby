import { login, logout, getInfo, getUserList } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import qs from 'qs'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  role: '',
  userListData: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_USERLIST: (state, data) => {
    state.userListData = data
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(qs.stringify(userInfo)).then(response => {
        commit('SET_TOKEN', response.data.data.token)
        setToken(response.data.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const username = data.data.username
        const role = data.data.role
        const avatar = data.data.avatar || ''

        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLE', role)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户列表
  getUserList({ commit }, postData) {
    return new Promise((resolve, reject) => {
      getUserList(qs.stringify(postData)).then((response) => {
        const { data } = response
        commit('SET_USERLIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

