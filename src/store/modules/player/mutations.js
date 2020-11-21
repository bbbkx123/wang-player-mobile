import * as types from './mutation_types'

export default {
  [types.PLAYER_SONG_URL] (state, url) {
    state.url = url
  },
  [types.PLAYER_SONG_PIC] (state, pic) {
    state.pic = pic
  }
}