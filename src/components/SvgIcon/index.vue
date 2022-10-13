<template>
  <!-- 判断是否为外链，是则显示div，不是则显示svg -->
  <!-- 
    此时SvgIcon组件会被views里页面使用（外部事件直接绑定在内部标签上）
    <svg-icon @click="btn" @test="fn"></svg-icon>
    在svgIcon这个组件中，可以使用$listeners接受所有绑定的事件（Vue内置）
    $listeners值：{ click: btn , test: fn }

    v-on:时间名="事件处理函数"  一个个绑定@事件名
    v-on="{}" 快速给所在标签同时绑定多个事件和相应处理函数
   -->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <!-- svg里面的use，使用同源策略，不能使用外链 -->
  <!-- aria-hidden="true" 计算机朗读标签时，不要读svg -->
  <!-- use:使用id标识（对应的svg文件），来描绘此svg标签渲染的图形 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    // 字体图标svg文件名
    iconClass: {
      type: String,
      required: true
    },
    // 外部自定义类名（给图标用）
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 判断是否为外链，是则返回true
    // iconClass并不是外链，返回false
    isExternal() {
      return isExternal(this.iconClass)
    },
    // 拼接在内存中查找svg文件的id标识
    iconName() {
      return `#icon-${this.iconClass}`
    },
    // svg使用类名
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    // 外链icon样式
    styleExternalIcon() {
      return {
        // 蒙版：用css的方式设置图标
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
