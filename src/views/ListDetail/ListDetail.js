import { defineComponent, ref } from "vue";
import { props } from "./define";

import SongList from "components/SongList"


export default defineComponent({
  props,
  components: {SongList},
  setup(props) {
    return () => (
      <div>
        <SongList></SongList>
      </div>
    )
  }
})