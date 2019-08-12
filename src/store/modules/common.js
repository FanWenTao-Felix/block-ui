import { setStore, getStore } from '@/util/store'
import website from '@/config/website'

const common = {
  state: {
    isCollapse: false,
    screen: -1,
    showCollapse: true,
    showSearch: true,
    showMenu: true,
    website: website,
    colorName: getStore({ name: 'colorName' }) || '#409EFF'
  },
  mutations: {
    SET_COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse
    },
    SET_COLOR_NAME: (state, colorName) => {
      state.colorName = colorName;
      setStore({
        name: 'colorName',
        content: state.colorName,
      })
    }
  }
}
export default common
