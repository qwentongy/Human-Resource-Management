import Vue from 'vue'
import Router from 'vue-router'

// 动态路由
// 导入动态的路由
import departments from './modules/departments.js'
import employees from './modules/employees.js' 
import setting from './modules/setting.js'
import salarys from './modules/salarys.js'
import social from './modules/social.js'
import attendances from './modules/attendances.js'
import approvals from './modules/approvals.js'
import permission from './modules/permission.js'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */


// 准备一个动态路由表
const asyncRoutes = [
  departments,
  setting,
  employees,
  permission,
  approvals,
  attendances,
  salarys,
  social,
]

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    // 都是layout的子路由为什么不写一起
    // 为了在网址中的路由好看
    // 只有一级路由需要写/,子级可以省略/不写
    path: '/',
    component: Layout,  // 一级路由挂载点
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),   // 挂载layout右下角(AppMain,vue中)
      meta: { title: '首页', icon: 'dashboard' }   // meta固定名字(内置) 用来给当前路由对象添加额外信息
    }]
  },

  // 匹配路由表以外的路由时，重定向到404，好处：地址栏的路由显示为404，好看
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes , ...asyncRoutes ]  // 传入路由规则数组(路由表)
})

const router = createRouter()   // 路由对象

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
