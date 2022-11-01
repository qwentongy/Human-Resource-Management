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
 * @param {string} phone
 * @returns {Boolean}
 */
// 判断外面传入的名字是否是admin或者editor
export function validMobile(phone) {
  return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)
}
