import {defineComponent , ref} from "vue"
import {useStore} from "vuex"


import "./PlayPage.less"

export default defineComponent({
  setup(props) {
    let store = useStore()
    let pic = ref(store.getters.pic)
    
    const HandleClick = () => {
      console.log(store);
    }
    

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