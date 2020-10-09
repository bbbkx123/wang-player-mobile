<template>
  <div class="slider">
    <div class="slider-wrapper" ref="sliderRef">
      <div class="slider-group" ref="sliderGroupRef">
        <slot></slot>
      </div>
    </div>
    <div v-if="sliderGroupRef" class="dots">
      <div v-for="(dot, index) in dots" :key="index" :class="{active: currentPageIndex === index }"  class="dots-item"></div>
    </div>

  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue"

import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"

BScroll.use(Slide)



const initial = (state) => {
  let slider =  new BScroll(state.sliderRef, {
    scrollX: true,
    scrollY: false,
    momentum: false,
    slide: {
      loop: true,
      threshold: 0.3,
      speed: 400,
      autoplay: false
    }
  })
  slider.on("slideWillChange", (page) => {
    state.currentPageIndex = page.pageX
  })
}

const setSliderWidth = (state) => {
  let children = state.sliderGroupRef.children
  let width = 0
  let sliderWidth = state.sliderRef.clientWidth
  state.dots = new Array(...state.sliderGroupRef.children)
  for (let i = 0, len = children.length; i < len; i++) {
    let child = children[i]
    child.classList.add("slider-item")
    child.style.width = `${sliderWidth}px`
    width += sliderWidth
  }
  state.sliderGroupRef.style.width = `${width}px`
}

const methods = () => {
  return {initial, setSliderWidth}
}


export default {
  props: {
    size: {
      type: String,
      default: ''
    }
  },
  // props
  setup() {
    let state = reactive({
      sliderRef: {},
      sliderGroupRef: {},
      currentPageIndex: 0,
      dots: [],
      ...methods()
    })

    onMounted(() => {
      setTimeout(() => {
        state.setSliderWidth(state)
        state.initial(state)
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