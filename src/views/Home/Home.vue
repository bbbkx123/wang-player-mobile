<template>
  <div class="home">
    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="index" @click="() => clickTabs(tab.key)">{{tab.name}}</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import Slider from "components/Slider"
// import Mine from "views/Mine"
// import Recommend from "views/Recommend"
import {shallowReactive ,reactive, toRefs} from "vue"
import {useRouter} from "vue-router"
//  Recommend

export default {
  name: 'Mine',
  components: {
  },
  setup(props, ctx) {
    let router = useRouter()
    const routerMap = new Map([
      [0, "mine"],
      [1, "recommend"]
    ])
    const clickTabs = key => {
      router.push({name: routerMap.get(key)})
    }

    let state = reactive({
      tabs: [{
        key: 0,
        name: "我的",
      }, {
        key: 1,
        name: "发现"
      }, {
        key: 2,
        name: "云村"
      },{
        key: 3,
        name: "视频"
      }],
      currentTabKey: 0,
      clickTabs
    })

    

    return {...toRefs(state)}
  }
}
</script>
