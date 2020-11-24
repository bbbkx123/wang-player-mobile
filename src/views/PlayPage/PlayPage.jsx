import {defineComponent , ref, onMounted, onUnmounted, onUpdated} from "vue"
import {useStore} from "vuex"




import "./PlayPage.less"

export default defineComponent({
  setup(props) {
    let store = useStore()
    let pic = ref(store.getters.pic)
    
    const HandleClick = () => {
      console.log(store);
    }
    
    const init = (isInit) => {
      if (isInit) {
        store.commit("page/SHOW_HEADER", true)
        store.commit("page/BG_IMG", store.state.player.pic)
      } else {
        store.commit("page/SHOW_HEADER", false)
        store.commit("page/BG_IMG", '')
      }
    }

    init(true)
    onUnmounted(() => {
      init(false)
    })

    return () => (
      <div className="playpage">
        <div onClick={HandleClick}>palypage</div>
        <div className="pic">
          <img src={pic.value} alt=""/>
        </div>
      </div>
    )
  }
})