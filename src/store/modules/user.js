import { login, getInfo , getHeadInfo } from '@/api/user'   // 两个个接口
import { getToken, setToken, removeToken } from '@/utils/auth'  // 控制Token的方法
import { resetRouter } from '@/router'  // 导入路由文件resetRouter重置路由对象方法
import router from '@/router'

const getDefaultState = () => {
  return {
    // token持久化,刷新直接从cookie里面取
    token: getToken(),
    name: '',
    avatar: '',
    info: {}
  }
}

const state = getDefaultState()

const mutations = {
  // 重置state对象
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state,userInfo) => {
    state.info = userInfo
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { mobile, password } = userInfo
    try {
      let result = await login({ mobile: mobile.trim(), password: password })
      // console.log(result)
      // 这里接口返回的data就是token
      if (result.success) {
        const { data } = result
        commit('SET_TOKEN', data)
        setToken(data)
      }
      return result
    } catch (error) {
      return Promise.reject(error)
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    try {
      let {data: Info} = await getInfo()
      let {data: HeadInfo} = await getHeadInfo(Info.userId)
      commit('SET_USER', {...Info , ...HeadInfo })
    } catch (error) {
      // 失败说明token过期,删除token并重置state,返回失败对象,跳转到响应拦截器中跳转路由
      removeToken()
      commit('RESET_STATE')
      return Promise.reject(error.message)
    }
  },

  // user logout
  logout({ commit }) {
    // 花了几个小时找的bug
    // !!!必须先清token,再重置store数据
    // 否则会出执行跳转路由失败的情况
    removeToken()
    commit('RESET_STATE') 
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

