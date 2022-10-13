import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 白名单,无需token

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // 把title改为要去的路由组件的title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  // 下面总结:
  // 1.登录了,不让跳登录页,直接打回首页
  // 2.登陆了,去其他页,再次判断vuex里有无用户信息,有就放行,无则清除token并跳转到登录页
  // 3.未登录,判断去的是否是白名单列表里的路由(登录页),是则放行,不是则打回登录页

  if (hasToken) {   // 如果有token(登录了状态)
    if (to.path === '/login') {   // 判断要去的是不是登录页
      // if is logged in, redirect to the home page
      // 若是则中断导航,去往首页/
      next({ path: '/' })
      NProgress.done()   // 关闭进度条,因为去首页会重新进入前置路由再次start进度条,本次进度条并没有关闭
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {   // 如果有用户信息则放行
        next()
      } else {
        try {
          // get user info
          // 若没有则获取用户信息再放行
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          // 获取用户信息失败,可能是token过期了,清除token
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // 然后去登录页并保存要去的路由地址
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    // 判断跳转的是否是登录页,是则放行
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 不是则打回登录页并携带原本要去的路由信息
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
