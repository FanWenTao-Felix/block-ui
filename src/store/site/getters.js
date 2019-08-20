export default {
  site: state => state.sites[state.site],
  theme: state => state.sites[state.site][state.group + 'Theme'],
  page: state => state.maximized ? state.maximized : state.pageDatas[state.path],
  navs: state => state.navs[state.site] ? state.navs[state.site][state.group] : null,
  subnavs: state => state.subnavs[state.topNav],
  pageComponents: state => state.pageComponents,
  editMode: state => state.pageEditMode,
  diyMode: state => state.pageDiyMode,
  dialogs: state => state.dialogs
}
