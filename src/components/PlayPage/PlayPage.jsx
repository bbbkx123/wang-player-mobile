import { defineComponent, ref, onMounted, onUnmounted, onUpdated } from "vue"
import { useStore } from "vuex"

import "./PlayPage.less"

export default defineComponent({
  setup(props) {
    let store = useStore()
    let pic = ref(store.state.player.pic)
    const HandleClick = () => {
      console.log(store)
    }

    store.dispatch("page/intoPage", {
      backgroundImage: pic.value,
      pageType: "list-details",
    })
    onUpdated(() => {
      store.dispatch("page/intoPage", {
        backgroundImage: pic.value,
        pageType: "list-details",
      })
    })

    onUnmounted(() => {
      store.dispatch("page/leavePage")
    })

    return () => (
      <div>
        <div className="play-page">
          <div className="sssssss"></div>
          <div onClick={HandleClick}>palypage</div>
          {
            pic.value && (
              <div className="pic-wrapper">
                <img style="width:100%;height:100%;" src={pic.value} alt="" />
              </div>
            )
          }
        </div>
      </div>
    )
  },
})
