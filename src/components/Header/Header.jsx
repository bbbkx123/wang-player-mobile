import { defineComponent, ref , watch} from "vue"
import { useRouter } from "vue-router"

import { props } from "./define"
import "./index.less"

export default defineComponent({
  props,
  setup(props) {
    let router = useRouter()
    function back() {
      router.back()
    }

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
          {/* props.mode === "list-detail" &&  */}
          {HeaderListDetail()}
        </div>
      )
  },
})
