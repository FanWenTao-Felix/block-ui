// eslint-disable-next-line no-unused-vars
function getFirstItem (navs) {
  for (let i = 0; i < navs.length; i++) {
    let item = navs[i]
    if (item.hidden) {
      // 隐藏项
    } else if (!item.submenu || !item.children || item.children.length === 0) {
      // 菜单项
      if (item.path) {
        return item.path
      }
    } else {
      // 子菜单
      return getFirstItem(item.children)
    }
  }
}
export default function (to, from, next) {
  next()
}
