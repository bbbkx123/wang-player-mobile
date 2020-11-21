import {defineComponent , ref} from "vue"
import {useStore} from "vuex"

export default defineComponent({
  setup(props) {
    let store = useStore()
    let pic = ref(store.getters.url)
    const HandleClick = () => {
      console.log(store);
    }
    

    return () => (
      <div >
        <div onClick={HandleClick}>palypage</div>
        <img src="" alt=""/>
      </div>
    )
  }
})