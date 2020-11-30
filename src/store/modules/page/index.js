
export default {
  namespaced: true,
  state: {
    showHeader: false,
    headerMode: null,
    bgImage: null,
    direction: 'go'
  },
  mutations: {
    "SHOW_HEADER" (state, showHeader) {
      state.showHeader = showHeader
    },
    "HEADER_MODE" (state, headerMode) {
      state.headerMode = headerMode
    },
    "BG_IMG" (state, bgImage) {
      state.bgImage = bgImage
    },
    "DIRECTION" (state, direction) {
      state.direction = direction
    }
  },
  actions: {
    // 进入listdetail类型页面
    intoPage (content, payload) {
      const {backgroundImage, pageType} = payload
      const {commit} = content
        // 显示header
      commit('SHOW_HEADER', true)
      commit('HEADER_MODE', pageType || 'list-details')
      // 设置背景图片
      commit('BG_IMG', backgroundImage || '')
      
    },
    leavePage ({commit}) {
      commit('SHOW_HEADER', false)
      commit('HEADER_MODE', '')
      // 设置背景图片
      commit('BG_IMG', '')
    }
  }
}