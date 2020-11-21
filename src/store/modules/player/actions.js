import {PLAYER_SONG_URL, PLAYER_SONG_PIC} from "./mutation_types"

export default {
  selectPlay ({commit}, {url, pic}) {
    commit(PLAYER_SONG_URL, url)
    commit(PLAYER_SONG_PIC, pic)
  }
}