import axios from "axios"

// 因为axios实例返回的就是promise，所以可以不用单独封装一个promise

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 拦截器
  instance.interceptors.request.use(config => {

    // 1.比如config中的一些信息不符合服务器要求

    // 2.如果每次发送网络请求的时候，都希望再界面中显示一个请求的图标
    // show出来，请求成功后再去请求成功拦截里面隐藏起来

    // 3.某些网络请求（token），必须携带一些特殊的信息，如果没有的话，就跳转到其他页面，比如登录页面

    // console.log(config);
    return config
  }, err => {
    console.log(err);
  }),
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  }, err => {
    console.log(err);
  })
  return instance(config)
}


// export function request(config,success,failure) {
//   // 1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://152.136.185.210:7878/api/hy66',
//     timeout: 5000
//   })

//   instance(config)
//   .then(res => {
//     success(res)
//   })
//   .catch(err => {
//     failure(err)
//   })
// }

// 利用回调函数的方式实现
// export function request(config) {
//   // 1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://152.136.185.210:7878/api/hy66',
//     timeout: 5000
//   })

//   instance(config.baseconfig)
//   .then(res => {
//     config.success(res)
//   })
//   .catch(err => {
//     config.failure(err)
//   })
// }

// promise方法---then里面就是resolve，catch里面就是reject
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: 'http://152.136.185.210:7878/api/hy66',
//       timeout: 5000
//     })
  
//     instance(config)
//     .then(res => {
//       resolve(res)
//     })
//     .catch(err => {
//       reject(err)
      
//     })
//   })
// }


  