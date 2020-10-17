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
import {onMounted, reactive, toRefs} from "vue"

import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"

const modeMap = new Map([
  ["Slide", () => BScroll.use(Slide)],
  ["", new Function()]
])

const initial = (state) => {
  const useMode = modeMap.get(state.mode)
  useMode()
  let slider =  new BScroll(state.sliderRef, state.sliderConf)
  if (state.mode === "Slide") {
    
    slider.on("slideWillChange", (page) => {
      state.currentPageIndex = page.pageX
    })
  }
  return slider
}

const setSliderWidth = (state) => {
  let width = 0
  let children = state.sliderGroupRef.children
  let sliderWidth = state.sliderRef.clientWidth
  state.dots = new Array(...state.sliderGroupRef.children)
  for (let i = 0, len = children.length; i < len; i++) {
    let child = children[i]
    let _width = typeof state.sliderItemWidth === "number" ? state.sliderItemWidth : sliderWidth
    child.classList.add("slider-item")
    child.style.width = `${_width}px`
    width += _width
  }
  state.sliderGroupRef.style.width = `${width}px`
}

const methods = () => {
  return {initial, setSliderWidth}
}

export default {
  props: {
    sliderConf: {
      type: Object,
      default: () => null
    },
    mode: {
      type: String,
      default: ""  
    },
    sliderItemWidth: {
      type: Number,
      defalut: null
    }
  },
  setup(props) {
    let state = reactive({
      sliderRef: {},
      sliderGroupRef: {},
      currentPageIndex: 0,
      dots: [],
      // slider: null,
      ...props,
      ...methods()
    })

    // let state1 = shallowReactive({
    //   slider: null
    // })

    onMounted(() => {
      setTimeout(() => {
        state.setSliderWidth(state)
        state.initial(state)
        // // 
        // console.log(state1);
        // if (state.mode !== "Slide") {
        //   state1.slider.scrollTo(1000,0)
        // }
      }, 200)
    })

    return {...toRefs(state)}
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
    .dots-item {
      margin-right: 5px;
      width: @dotsWidth;
      height: @dotsWidth;
      border-radius: 50%;
      background-color: red;
      &.active {
        background-color: blue;
      }
    }
  }
}

    
   
      
      
</style>