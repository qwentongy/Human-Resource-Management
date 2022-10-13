<script>
import { render } from 'nprogress'
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  // Vue组件创的方式有两种:
  // (1).vue文件 + template模板
  // (2)render渲染函数方式创建组件
  render(h, context) {
    // 参数1:createElement用于创建VNode(虚拟DOM)
    // 参数2:context 为没有实例的函数组件提供上下文信息
    // 上下文:运行时环境对象(this)
    const { icon, title } = context.props   // 拿到外面传入进来的属性和值
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        // render函数中,可以直接使用jsx语法(底层babel的翻译)
        // 底层中直接写标签,叫jsx语法,在标签里再嵌入js代码要使用一个{}包裹起来
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
    // 返回方式1
    // h() 参数1:接受标签名, 参数2:接受的子标签数组/文字内容
    // 返回方式2
    // 直接返回标签数组
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
