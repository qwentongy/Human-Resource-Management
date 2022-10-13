<template>
  <!-- 登录后主页的容器 -->
  <div :class="classObj" class="app-wrapper">

    <!-- 移动端并且侧边栏打开，黑色半透明蒙版 -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />

    <!-- 左侧侧边导航栏 -->
    <sidebar class="sidebar-container" />

    <!-- 右侧容器 -->
    <div class="main-container">
      <!-- 右侧头部导航 -->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <!-- 右侧主体部分 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  // 提取公共的配置项和值,使用的地方注入回来
  mixins: [ResizeMixin],
  computed: {
    // 侧边栏的状态对象
    sidebar() {
      // 开启了命名空间，取值需要添加模块名
      return this.$store.state.app.sidebar
    },
    // 获取设备信息
    device() {
      return this.$store.state.app.device
    },
    // 来自于src/settings.js -> vuex里settings.js 导出一个头部导航栏是否固定定位
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    // 整个layout页面容器样式
    // 当布尔值为true时,类名就会生效在最外层div身上
    classObj() {
      return {
        // 类名:布尔值
        hideSidebar: !this.sidebar.opened,  // 侧边栏打开了,hid类名不要eSidebar
        openSidebar: this.sidebar.opened, //侧边栏打开了,openSidebar类名要
        withoutAnimation: this.sidebar.withoutAnimation, // vuex里面的withoutAnimation为false,不要动画类名
        mobile: this.device === 'mobile'  // 移动端才有mobile类名
      }
    }
  },
  methods: {
    // 蒙版点击事件
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
