import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
// 参数1:config 箭头体函数 ->发请求前会走这里(必须return请求配置对象,return到axios的use内)
// 参数2:error  箭头体函数 ->请求失败时会走这里(这里写请求失败时的响应)
service.interceptors.request.use(
  // config里面包含axios内置配置还有api接口方法你写url/data/params/method等参数
  config => {
    // do something before request is sent
    // 判断vuex里面有没有token
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // 若有则把token拼接在请求头加入X-Token,值为token值
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    // 返回Promise的reject状态
    return Promise.reject(error)
  }
)

// response interceptor
// 参数1:resolve 箭头体函数 ->成功,只有在响应状态码为2xx,3xx进入
// 参数2:reject  箭头体函数 ->失败,响应状态码为4xx,5xx(或者捕捉到了其他错误的时候)进入
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 保存数据(另一方面,拿数据方便,这里直接把数据拿出来,返回res)
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // 判定状态 20000是和后台商量好直接判断code
    // 重点:http响应过程都是ok的,但是逻辑上有错误
    // 例如登录->账号密码->发给后台请求成功了,但是后台发现账号或密码错了,就返回其他的code
    if (res.code !== 20000 && res.code !== 10000 ) {   // 不等于20000就证明有错误
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 错误提示
      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code === 10002) {
        // to re-login
        MessageBox.confirm('身份已过期,请重新登录', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } 
    // 如过上面的if都进不去,就表示完全成功了(http状态成功,code也成功)
    else {
      // 返回数据
      return res
    }
  },
  error => {
    // 新语法,需要babel支持,左侧有值才会继续.下去
    // token过期,跳转
    if(error?.response?.data?.code == 10002) {
      router.replace(`/login?redirect = ${router.currentRoute.fullPath}`)
    }
    console.dir(error);
    console.log('err' + error) // for debug
    Message({
      message: error.response && error.response.data && error.response.data.message || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
