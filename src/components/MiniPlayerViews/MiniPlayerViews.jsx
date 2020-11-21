import {defineComponent} from "vue"
import {useRouter} from "vue-router"

import "./index.less"

export default defineComponent({
  setup () {
    let router = useRouter()

    const HandleClick = () => {
      router.push({name: "playpage"})
    }

    return () => (
      <div class="mini-player" onClick={HandleClick}>MiniPlayerViews</div>
    )
  }
})