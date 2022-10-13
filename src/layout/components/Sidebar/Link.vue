<template>
  <!-- 动态组件 -->
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      // 判断是否为外链
      if (this.isExternal) {
        return {
          href: to,   // a标签点击跳转的地址
          target: '_blank',   // 打开新的标签页
          rel: 'noopener'   // 当前文档对于下一个文档的的关系标识
        }
      }
      // 若不是外链则只给router-link绑定to属性,就是要跳转的路由
      return {
        to: to
      }
    }
  }
}
</script>
