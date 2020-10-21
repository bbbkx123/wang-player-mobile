import {
  defineComponent,
  onMounted,
  reactive,
  computed,
  ref,
  unref,
} from "vue";

import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";

const modeMap = new Map([
  ["Slide", () => BScroll.use(Slide)],
  ["", new Function()],
]);

import "./index.less";

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
    let refSlider = ref(null);
    let refSliderGroup = ref(null);
    let currentPageIndex = ref(null);
    let dots = ref([]);

    function initial() {
      modeMap.get(props.mode)();
      let slider = new BScroll(refSlider.value, props.sliderConf);
      let hooks = slider.scroller.actionsHandler.hooks;

      if (props.mode === "Slide") {
        slider.on("slideWillChange", (page) => {
          currentPageIndex = page.pageX;
        });
      }

      hooks.on("click", (event) => {
        emit("hook-click", event);
      });

      return slider;
    }

    function setSliderWidth() {
      

      
    // console.log(fn);

      let elRefSlider = unref(refSlider);
      let elRefSliderGroup = unref(refSliderGroup);

      let width = 0;
      let children = elRefSliderGroup.children;
      let sliderWidth = elRefSlider.clientWidth;
      let _width =
        typeof props.sliderItemWidth === "number"
          ? props.sliderItemWidth
          : sliderWidth;
      let _height = props.sliderItemHeight;
      let needSetHeight = typeof _height === "number" && _height > 0;
      dots = new Array(elRefSliderGroup.children);
      for (let i = 0, len = children.length; i < len; i++) {
        let child = children[i];
        child.classList.add("slider-item");
        child.style.width = `${_width}px`;
        if (needSetHeight) child.style.height = `${_height}px`;
        width += _width;
      }
      elRefSliderGroup.style.width = `${width}px`;
    }

    function getSlot(slots, slot = 'default', data) {
      if (!slots || !Reflect.has(slots, slot)) {
        return null;
      }

      if (typeof slots[slot] !== 'function') {
        console.error(`${slot} is not a function!`);
        return null;
      }
      const slotFn = slots[slot];
      if (!slotFn) return null;
      return slotFn(data);
    }

    // console.log(getSlot(slots, "default"));

    

    onMounted(() => {
      setTimeout(() => {
        setSliderWidth();
        let slider = initial();
      }, 200);
    });

    return () => (
      <div class="slider">
        <div class="slider-wrapper" ref={refSlider}>
          <div class="slider-group" ref={refSliderGroup}>
            {getSlot(slots)}
          </div>
        </div>
        {props.mode && unref(refSliderGroup) && (
          <div class="dots">
            {unref(dots).map((dot, index) => {
              return (
                <div
                  key={index}
                  classList={{
                    active: unref(currentPageIndex) === index,
                    "dots-item": true,
                  }}
                ></div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
