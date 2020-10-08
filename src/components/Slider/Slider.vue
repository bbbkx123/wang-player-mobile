<template>
  <div>
    <div class="slider-wrapper" ref="sliderRef">
      <div class="slider-group" ref="sliderGroupRef">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue"

import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"

BScroll.use(Slide)



const initial = (slideRef) => {
  return new BScroll(slideRef, {
    scrollX: true,
    scrollY: false,
    momentum: false,
    slide: {
      // loop: true,
      threshold: 0.3,
      speed: 400,
      autoplay: false
    }
  })
}

const setSliderWidth = (sliderRef, sliderGroupRef) => {
  let children = sliderGroupRef.children
  let width = 0
  let sliderWidth = sliderRef.clientWidth
  for (let i = 0, len = children.length; i < len; i++) {
    let child = children[i]
    child.classList.add("slider-item")
    child.style.width = `${sliderWidth}px`
    width += sliderWidth
  }
  sliderGroupRef.style.width = `${width}px`
  console.log(width);
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
      ...methods()
    })

    // let slider = null

    

    onMounted(() => {
      setTimeout(() => {
        state.setSliderWidth(state.sliderRef, state.sliderGroupRef)
        // slider = 
        state.initial(state.sliderRef)
        // console.log(slider);
      }, 200)
    })

    return {...toRefs(state)}
  }
}
</script>

<style lang="less">
.slider-wrapper {
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
    }
  }
}
    
   
      
      
</style>