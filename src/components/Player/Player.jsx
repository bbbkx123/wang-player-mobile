import { defineComponent, ref, onMounted, watch } from "vue"
import { useStore } from "vuex"

// mixins + vuex
export default defineComponent({
  setup() {
    let audioRef = ref({})
    let store = useStore()

    watch(
      () => store.state.player.url,
      (newValue, oldValue) => {
        if (newValue) {
          audioRef.value.src = newValue
        }
      }
    )

    const init = (audioRef) => {
      if (!audioRef) return
      Object.assign(audioRef, {
        src: store.state.player.url,
        autoplay: false,
        volume: 0.1,
      })
    }

    const onCanPlay = () => {
      play()
    }

    const play = () => {
      if (!audioRef.value) return
      audioRef.value.play()
    }

    onMounted(() => {
      init(audioRef.value)
    })

    return () => <audio ref={audioRef} onCanPlay={onCanPlay}></audio>
  },
})
