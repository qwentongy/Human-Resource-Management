/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  // 正则判断是否为外链
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
// 判断外面传入的名字是否是admin或者editor
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  // indexOf():在数组中查找首次出现目标的下标,没有返回-1
  // trim():去除字符串左右两边的空格
  return valid_map.indexOf(str.trim()) >= 0
}
