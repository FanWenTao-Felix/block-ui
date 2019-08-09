import website from '@/config/website'

const common = {
  state: {
    isCollapse: false,
    screen: -1,
    showCollapse: true,
    showSearch: true,
    showMenu: true,
    website: website
  },
  mutations: {
    SET_COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse
    }
  }
}
export default common
