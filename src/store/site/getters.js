export default {
  site: state => state.sites[state.site],
  theme: state => state.sites[state.site][state.group + 'Theme'],
  page: state => state.maximized ? state.maximized : state.pageDatas[state.path],
  navs: state => state.navs[state.site] ? state.navs[state.site][state.group] : null,
  subnavs: state => state.subnavs[state.topNav],
  pageComponents: state => state.pageComponents,
  dialogs: state => state.dialogs
}
