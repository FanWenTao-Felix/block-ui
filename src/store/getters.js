const getters = {
  website: state => state.common.website,
  language: state => state.common.language,
  colorName: state => state.common.colorName,
  isCollapse: state => state.common.isCollapse,
  keyCollapse: (state, getters) => getters.screen > 1 ? getters.isCollapse : false,
  screen: state => state.common.screen,
  tagWel: state => state.tags.tagWel,
  menu: state => state.user.menu,
  menuAll: state => state.user.menuAll,

  site: state => state.sites[state.site],
  theme: state => state.sites[state.site][state.group + 'Theme'],
  page: state => state.maximized ? state.maximized : state.pageDatas[state.path],
  navs: state => state.navs[state.site] ? state.navs[state.site][state.group] : null,
  subnavs: state => state.subnavs[state.topNav],
  sites: state => state.info.sites
}
export default getters
