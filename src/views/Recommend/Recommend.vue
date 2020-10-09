<template>
  <div class="home">
    <Slider>
      <div v-for="(item, index) in banners" :key="index">
        <a href="">
          <img :src="item.imageUrl" alt="">
          <!-- <img :src="item.imageUrl" alt=""> -->
        </a>
      </div>
    </Slider>
  </div>
</template>

<script>
import {reactive, onBeforeMount, toRefs} from "vue"
import Slider from 'components/Slider'
import {ApiGetBanner} from "api"

const getBanner = (state) => {
  return ApiGetBanner({type: 1}).then(res => {
    state.banners = res.data.banners
  })
}

export default {
  name: "Recommend",
  components: {
    Slider
  },
  setup() {
    let state = reactive({
      banners: []
    })

    onBeforeMount(() => {
      getBanner(state)
    })

    return {...toRefs(state)}
  }
}
</script>
