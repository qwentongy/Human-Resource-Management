import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,   // 暂无使用
  fixedHeader: fixedHeader,   // 头部导航是否固定
  sidebarLogo: sidebarLogo    // 侧边栏头部是否有logo组件
}

const mutations = {
  // 改变设置的值
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    // 判断是否有该属性 只改不增所以添加该判断
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

