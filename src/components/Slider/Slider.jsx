import { defineComponent, onMounted, reactive, computed, ref, unref } from "vue"

import { getSlot } from "common/js/util"
import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"

const modeMap = new Map([
  ["Slide", () => BScroll.use(Slide)],
  ["", new Function()],
])

import "./index.less"

export default defineComponent({
  props: {
    // BScroll实例配置
    sliderConf: {
      type: Object,
      default: () => null,
    },
    // 模式: Slide(焦点轮播)
    mode: {
      type: String,
      default: "",
    },
    sliderItemWidth: {
      type: Number,
      defalut: null,
    },
    sliderItemHeight: {
      type: Number,
      defalut: null,
    },
  },
  emits: ["hook-click"],
  setup(props, { slots, emit, attrs }) {
    let refSlider = ref(null)
    let refSliderGroup = ref(null)
    let currentPageIndex = ref(0)
    let dots = ref([])

    function initial() {
      modeMap.get(props.mode)()
      let slider = new BScroll(refSlider.value, props.sliderConf)
      let hooks = slider.scroller.actionsHandler.hooks

      if (props.mode === "Slide") {
        slider.on("slideWillChange", (page) => {
          currentPageIndex.value = page.pageX
        })
      }

      hooks.on("click", (event) => {
        emit("hook-click", event)
      })

      return slider
    }

    function setSliderWidth() {
      let elRefSlider = unref(refSlider)
      let elRefSliderGroup = unref(refSliderGroup)
      let width = 0
      let children = elRefSliderGroup.children
      let sliderWidth = elRefSlider.clientWidth
      let _width =
        typeof props.sliderItemWidth === "number"
          ? props.sliderItemWidth
          : sliderWidth
      let _height = props.sliderItemHeight
      let needSetHeight = typeof _height === "number" && _height > 0
      dots.value = [...elRefSliderGroup.children].map(() => true)

      for (let i = 0, len = children.length; i < len; i++) {
        let child = children[i]
        child.classList.add("slider-item")
        child.style.width = `${_width}px`
        if (needSetHeight) child.style.height = `${_height}px`
        width += _width
      }
      elRefSliderGroup.style.width = `${width}px`
    }

    onMounted(() => {
      setTimeout(() => {
        setSliderWidth()
        initial()
      }, 20)
    })

    return () => (
      <div className="slider">
        <div className="slider-wrapper" ref={refSlider}>
          <div className="slider-group" ref={refSliderGroup}>
            {getSlot(slots)}
          </div>
        </div>
        {props.mode === "Slide" && dots.value.length > 0 && (
          <div class="dots">
            {dots.value.map((dot, index) => {
              let _class = currentPageIndex.value === index ? 'active' : ''
              _class += ' dots-item'
              return (
                <div
                  key={index}
                  className={_class}
                ></div>
              )
            })}
          </div>
        )}
      </div>
    )
  },
})
