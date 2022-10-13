import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component 全局svg组件，显示svg图形

// register globally
Vue.component('svg-icon', SvgIcon)

// require.context() webpack内置api,用于自动化导入模块
// 参数1：读取文件夹路径
// 参数2：是否读取子文件夹
// 参数3：符合正则的才会导入   .svg结尾文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
