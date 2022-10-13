// 浏览器本地存储方式 (重要:值都是字符串)
// (1)localStorage
// (2)sessionStorage
//   存入:sessionStorage.setItem('key','value')
//   去除:sessionStorage.getItem('key')
// (3)cookie
//   存入:document.cookie = 'key=value;'
//   取出:document.cookie 会把所有的cookie都拿出来,很麻烦

// 借助js-cookie的包,用其方法直接取就好了
import Cookies from 'js-cookie'

const state = {
  // 注意：vuex会在刷新时，所有数据回归初始值
  sidebar: {  
    // Cookies.get('sidebarStatus') 本地值 '0'侧边栏收起(false)  '1'侧边栏打开(true)
    // 字符串'0'代表true,数字0代表false
    // !!+ 是什么意思
    // +'0' +'1' 意思:隐式类型转换, 将其转化为数字类型
    // !0 !1 意思:隐式类型转换, 将其转化为布尔值,true和false
    // 加了!发现疑似反了,再加一个 ! 取反回来
    // 当第一次打开时,Cookies.get('sidebarStatus')为null(false),就会把后面的值(true)给opened
    // 效果默认上来侧边栏打开
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false // 侧边栏收起是否有动画(看变量名分析) false为使用过度动画,true为不使用
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 关闭侧边栏
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 更改设备标识
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
