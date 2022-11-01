/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * // 格式化时间变成字符串
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  // 判断没有参数或者参数是undefined/null/''
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'   // 格式化目标格式
  let date  //保存日期对象
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {  // 只能由0-9的数字组成(+匹配1到多次)
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari(支持safari内置的浏览器,时间字符串只能/不能-)
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        // g全局匹配,可以匹配多次不然只能匹配一次
        // m多行匹配,如果字符串包含回车多行也能匹配到
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    // 如果是数字并且长度为10说明传入的是秒,但是new Data()里面要求传入的是毫秒 1s = 1000ms
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  //*************************分割线,上面判断time值得到data日期对象***************** */

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0') // 补全指定位数,不够前面添加0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  // ('' + time):类型转换,转成数字
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    // 转成数字
    time = +time
  }
  const d = new Date(time)  // 时间戳变成日期对象
  const now = Date.now()   // 当前系统时间戳

  const diff = (now - d) / 1000   // 时间差值

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    // Math.ceil() 向上取值
    // Math.floor() 向下取值
    // Math.rand() 四舍五入
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
// 将网址中的路由信息还原为js能识别的样子
export function param2Obj(url) {
  // decodeURIComponent() 内置方法,可以把url编码转换为原来的样子
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}


// 递归转树的函数
/*
 * 参数1：数组不要在里面写死，所以应该传进来
 * 参数2：要查找的pid不要写死，传什么就查什么
 */
export function arrayToTree (arr, pid) {
  // 装节点的数组
  const list = []
  // 遍历数组找到这一级的节点
  arr.forEach(v => {
    if (v.pid === pid) {
      list.push(v)
      // 1级里有2级，2级里可能有3级.....
      const children = arrayToTree(arr, v.id)
      if (children.length > 0) {
        v.children = children
      }
    }
  })
  // 返回结果
  return list
}
