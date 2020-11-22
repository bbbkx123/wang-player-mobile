import { defineComponent, ref , watch} from "vue"
import { useRouter } from "vue-router"

import { props } from "./define"
import "./index.less"

export default defineComponent({
  props,
  setup(props) {
    let router = useRouter()
    let show = ref(props.show)
    function back() {
      router.back()
    }

    // watch(
    //   () => props.show,
    //   (newValue, oldValue) => {
    //     debugger
    //     if (newValue) {
    //       // audioRef.value.src = newValue
    //     }
    //   }
    // )

    function HeaderListDetail() {
      return (
        <>
          <div className="icon-item list-detail-left" onClick={back}>
            <i className="iconfont icon-houtui"></i>
          </div>
          <div className="icon-item">
            <i className="iconfont icon-sousuo"></i>
          </div>
          <div className="icon-item">
            <i className="iconfont icon-ziyuan"></i>
          </div>
        </>
      )
    }

    // console.log(show.value);

    return () =>
      props.show && (
        <div className="header">
          <span>{show.value ?"true": "false"}</span>
          {/* props.mode === "list-detail" &&  */}
          {HeaderListDetail()}
        </div>
      )
  },
})
