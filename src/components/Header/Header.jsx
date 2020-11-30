import { defineComponent, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

import { props } from "./define"
import "./index.less"

export default defineComponent({
  props,
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const routerMap = new Map([
      [0, "mine"],
      [1, "recommend"],
    ])
    const tabs = ref([
      {
        key: 0,
        name: "我的",
      },
      {
        key: 1,
        name: "发现",
      },
      // {
      //   key: 2,
      //   name: "云村",
      // },
      // {
      //   key: 3,
      //   name: "视频",
      // },
    ])
    const currentTabKey = ref(null)

    function back() {
      store.commit('page/DIRECTION', 'back')
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

    function clickTabs(key) {
      currentTabKey.value = key
      router.push({ name: routerMap.get(key) })
    }

    function HomeNavigation() {
      return (
        <div class="navigation">
          <div class="trigger"></div>
          <div class="tabs">
            {tabs.value.map((tab, index) => {
              return (
                <div
                  className={[
                    "tab-item",
                    currentTabKey.value === index ? "tab-active" : null,
                  ].join(" ")}
                  onClick={clickTabs}
                >
                  {tab.name}
                </div>
              )
            })}
          </div>
          <div class="search"></div>
        </div>
      )
    }

    return () => (
        <div className="header">
          { props.show && props.mode === "list-details" && HeaderListDetail()}
          { props.show && props.mode === "home" && HomeNavigation()}
        </div>
      )
  },
})
