import { defineComponent, ref } from "vue";
import { props } from "./define";

export default defineComponent({
  props,
  setup(props) {
    return () => (
      <div>song-list</div>
    )
  }
})