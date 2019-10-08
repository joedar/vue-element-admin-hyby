import axios from 'axios'
import qs from 'qs'

const ajax = (() => {
  return {
    post: (param) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: param.url,
          data: qs.stringify(param.data)
        }).then((res) => {
          const { data } = res
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: (param) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: param.url
        }).then((res) => {
          const { data } = res
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
})()

// const ajax = {
//   post: (param) => {
//     return new Promise((resolve, reject) => {
//       axios({
//         method: 'post',
//         url: param.url,
//         data: qs.stringify(param.data)
//       }).then((res) => {
//         const { data } = res
//         resolve(data)
//       }).catch((err) => {
//         reject(err)
//       })
//     })
//   },
//   get: (param) => {
//     return new Promise((resolve, reject) => {
//       axios({
//         method: 'get',
//         url: param.url
//       }).then((res) => {
//         const { data } = res
//         resolve(data)
//       }).catch((err) => {
//         reject(err)
//       })
//     })
//   }
// }

export default ajax

