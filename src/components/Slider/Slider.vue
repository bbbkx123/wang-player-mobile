<template>
  <div class="slider">
    <div class="slider-wrapper" ref="sliderRef">
      <div class="slider-group" ref="sliderGroupRef">
        <slot></slot>
      </div>
    </div>
    <div v-if="mode === 'Slide' && sliderGroupRef" class="dots">
      <div v-for="(dot, index) in dots" :key="index" :class="{active: currentPageIndex === index }"  class="dots-item"></div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, shallowReactive} from "vue"

import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"

const modeMap = new Map([
  ["Slide", () => BScroll.use(Slide)],
  ["", new Function()]
])

const initial = (state) => {
  modeMap.get(state.mode)()
  let slider =  new BScroll(state.sliderRef, state.sliderConf)
  let hooks = slider.scroller.actionsHandler.hooks
  
  if (state.mode === "Slide") {
    slider.on("slideWillChange", (page) => {
      state.currentPageIndex = page.pageX
    })
  }

  if (state.handleStart instanceof Function) {
    hooks.on("start", event => {
      state.handleStart(event)
    })
  }

  return slider
}

const setSliderWidth = (state) => {
  let width = 0
  let children = state.sliderGroupRef.children
  let sliderWidth = state.sliderRef.clientWidth  
  let _width = typeof state.sliderItemWidth === "number" ? state.sliderItemWidth : sliderWidth
  let _height = state.sliderItemHeight
  let needSetHeight = typeof _height === "number" && _height > 0
  state.dots = new Array(...state.sliderGroupRef.children)
  for (let i = 0, len = children.length; i < len; i++) {
    let child = children[i]
    child.classList.add("slider-item")
    child.style.width = `${_width}px`
    if (needSetHeight) child.style.height = `${_height}px`
    width += _width
  }
  state.sliderGroupRef.style.width = `${width}px`
}

const methods = () => {
  return {initial, setSliderWidth}
}

export default {
  props: {
    // BScroll实例配置
    sliderConf: {
      type: Object,
      default: () => null
    },
    // 模式: Slide(焦点轮播)
    mode: {
      type: String,
      default: ""  
    },
    sliderItemWidth: {
      type: Number,
      defalut: null
    },
    sliderItemHeight: {
      type: Number,
      defalut: null
    },
    handleStart: {
      type: Function,
      default: null
    }
  },
  setup(props) {
    let state = reactive({
      sliderRef: {},
      sliderGroupRef: {},
      currentPageIndex: 0,
      dots: [],
      ...props,
      ...methods()
    })

    let state1 = shallowReactive({
      slider: null
    })

    onMounted(() => {
      setTimeout(() => {
        state.setSliderWidth(state)
        state1.slider = state.initial(state)
      }, 200)
    })

    return {...toRefs(state), ...state1}
  }
}
</script>

<style lang="less">
@dotsWidth: 8px;

.slider {
  position: relative;
  .slider-wrapper {
    width: 100%;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item {
        float: left;
        padding: 10px;
        box-sizing: border-box;
        & img {
          width: 100%;
          border-radius: 5px;
        }
      }
    }
  }
  .dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    background-color: transparent;
    .dots-item {
      margin-right: 5px;
      width: @dotsWidth;
      height: @dotsWidth;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.2);
      &.active {
        background-color: rgba(255,58,58,1);
      }
    }
  }
}

    
   
      
      
</style>