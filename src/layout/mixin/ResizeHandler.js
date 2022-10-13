import store from '@/store'   // 引入store对象,因为这里有js文件,不能使用this.store

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  // 侦听器
  watch: {
    // 当路由发生变化时执行
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {  // 移动端+侧边栏打开
        // 就把侧边栏关闭
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  // 混入vue组件在挂载之前执行
  beforeMount() {
    // resize 窗口尺寸改变就触发
    window.addEventListener('resize', this.$_resizeHandler)
  },
  // 组件销毁时,移除事件监听
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    // 如果是移动端,更改vuex仓库中的设备标识,并且关闭侧边导航栏
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 判断是否为移动端设备
    $_isMobile() {
      const rect = body.getBoundingClientRect() // 获取body窗口大小
      return rect.width - 1 < WIDTH   // 小于992,就返回true(判定为移动设备)
      // 为什么-1   有的浏览器分辨率不是100%,而是125%,宽度会有小数误差
    },
    // 重置vuex里的设备标识
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
        // 如果是移动端,就会关闭侧边栏
        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
