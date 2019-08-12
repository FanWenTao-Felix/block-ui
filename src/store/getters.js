const getters = {
  website: state => state.common.website,
  language: state => state.common.language,
  colorName: state => state.common.colorName,
  isCollapse: state => state.common.isCollapse,
  keyCollapse: (state, getters) => getters.screen > 1 ? getters.isCollapse : false,
  screen: state => state.common.screen,
  tagWel: state => state.tags.tagWel,
  menu: state => state.user.menu,
  menuAll: state => state.user.menuAll
}
export default getters
