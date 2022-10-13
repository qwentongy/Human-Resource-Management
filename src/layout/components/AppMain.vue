<template>
  <!-- section原生标签（定义章节） -->
  <section class="app-main">
    <!-- transition vue内置组件->过渡组件  路由切换时会有过度动画 -->
    <transition name="fade-transform" mode="out-in">
      <!-- key的作用:新旧虚拟DOM对比的时候,加快对比效率使用标记 -->
      <!-- 二级路由挂载点 -->
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
