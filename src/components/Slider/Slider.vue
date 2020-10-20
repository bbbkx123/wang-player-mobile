<template>
  <div class="slider">
    <div class="slider-wrapper" ref="sliderRef">
      <div class="slider-group" ref="sliderGroupRef">
        <slot></slot>
      </div>
    </div>
    <div v-if="mode === 'Slide' && sliderGroupRef" class="dots">
      <div
        v-for="(dot, index) in dots"
        :key="index"
        :class="{ active: currentPageIndex === index }"
        class="dots-item"
      ></div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs
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
    }
  },
  emits: ["start"],
  setup(props, { slots, emit, attrs }) {
    let state = reactive({
      sliderRef: {},
      sliderGroupRef: {},
      currentPageIndex: null,
      dots: [],
    });

    function initial() {
      modeMap.get(props.mode)();
      let slider = new BScroll(state.sliderRef, props.sliderConf);
      let hooks = slider.scroller.actionsHandler.hooks;

      if (props.mode === "Slide") {
        slider.on("slideWillChange", (page) => {
          state.currentPageIndex = page.pageX;
        });
      }

      hooks.on("start", (event) => {
        emit("start", event)
      });
      
      return slider;
    }

    function setSliderWidth() {
      let width = 0;
      let children = state.sliderGroupRef.children;
      let sliderWidth = state.sliderRef.clientWidth;
      let _width =
        typeof props.sliderItemWidth === "number"
          ? props.sliderItemWidth
          : sliderWidth;
      let _height = props.sliderItemHeight;
      let needSetHeight = typeof _height === "number" && _height > 0;
      state.dots = [...state.sliderGroupRef.children];
      for (let i = 0, len = children.length; i < len; i++) {
        let child = children[i];
        child.classList.add("slider-item");
        child.style.width = `${_width}px`;
        if (needSetHeight) child.style.height = `${_height}px`;
        width += _width;
      }
      state.sliderGroupRef.style.width = `${width}px`;
    }

    onMounted(() => {
      setTimeout(() => {
        setSliderWidth(state);
        let slider = initial(state);
      }, 200);
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
