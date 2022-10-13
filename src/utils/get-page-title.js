import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'

// 设置浏览器标签栏上标题的
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
