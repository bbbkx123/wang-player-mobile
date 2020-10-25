import { defineComponent, ref, reactive, unref, computed, onMounted } from "vue"
import { props } from "./define"

import { ApiPlayListDetail, ApiSongsDetail } from "api"

import SongList from "components/SongList"
import Header from "components/Header"

import "./index.less"
import BScroll from "@better-scroll/core"

export default defineComponent({
  props,
  components: { SongList },
  setup(props) {
    let detail = ref({})

    let ListData = ref([])
    
    let listDetailRef = ref(null)
    let emojis = ref([
      "😀 😁 😂 🤣 😃",
      "😄 😅 😆 😉 😊",
      "😫 😴 😌 😛 😜",
      "👆🏻 😒 😓 😔 👇🏻",
      "😑 😶 🙄 😏 😣",
      "😞 😟 😤 😢 😭",
      "🤑 😲 🙄 🙁 😖",
      "👍 👎 👊 ✊ 🤛",
      "🙄 ✋ 🤚 🖐 🖖",
      "👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼",
      "☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽",
      "🌖 🌗 🌘 🌑 🌒",
      "💫 💥 💢 💦 💧",
      "🐠 🐟 🐬 🐳 🐋",
      "😬 😐 😕 😯 😶",
      "😇 😏 😑 😓 😵",
      "🐥 🐣 🐔 🐛 🐤",
      "💪 ✨ 🔔 ✊ ✋",
      "👇 👊 👍 👈 👆",
      "💛 👐 👎 👌 💘",
      "👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼",
      "☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽",
      "🌖 🌗 🌘 🌑 🌒",
      "💫 💥 💢 💦 💧",
      "🐠 🐟 🐬 🐳 🐋",
      "😬 😐 😕 😯 😶",
      "😇 😏 😑 😓 😵",
      "🐥 🐣 🐔 🐛 🐤",
      "💪 ✨ 🔔 ✊ ✋",
      "👇 👊 👍 👈 👆",
      "💛 👐 👎 👌 💘",
    ])

    function getPlayListDetail() {
      return ApiPlayListDetail(3159790268).then((res) => {
        let { coverImgUrl, name, trackIds, tracks } = res.data.playlist
        let { avatarUrl, nickname } = res.data.playlist.creator
        detail.value = {
          avatarUrl,
          nickname,
          name,
          coverImgUrl,
          trackIds,
          tracks,
        }
        ListData.value = []

        // setTimeout(() => {
          ListData.value = detail.value.tracks.map((item) => {
            return {
              name: item.name,
              artist: item.ar,
              album: item.al,
            }
          })
        // }, 5000)
        console.log(JSON.stringify(ListData.value))
      })
    }

    getPlayListDetail()

    function Detail() {
      let _detail = unref(detail)
      return (
        <div className="detail-wrapper">
          <div
            className="detail-background"
            style={{
              backgroundImage: `url(${detail.value.coverImgUrl})`,
              opacity: 0.5,
              filter: "blur(100px)",
              width: "100%",
              height: "100%",
            }}
          ></div>
          <div className="detail">
            <div className="coverImg">
              <img src={_detail.coverImgUrl} alt="" />
            </div>
            <div className="info">
              <div>{_detail.name}</div>
              <div>{_detail.nickname}</div>
              <div>
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  src={_detail.avatarUrl}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="edit"></div>
        </div>
      )
    }

    onMounted(() => {
      // debugger
      setTimeout(() => {
        // 此步骤快于数据设置
        let scroll = new BScroll(listDetailRef.value, {
          probeType: 3,
          click: true,
          // scrollX: true,
          // scrollY: true,
          // momentum: true,
          // probeType:3,
          // directionLockThreshold: 0,
        })
  
        scroll.on("scroll", ({ y }) => {
          console.log("scrolling-")
        })
      }, 200)
    })

    return () => (
      // <Header mode="list-detail"></Header>\
      // ref={listDetailRef}
      <div className="list-detail" ref={listDetailRef}>
        <div>
        {Detail()}
        <div className="song-list">
            {ListData.value.map((item, index) => {
              return (
                <div className="song-item">
                  <div className="index"></div>
                  <div className="main">
                    <div className="song-name">{item.name}</div>
                    <div className="other-info">
                      <span className="info">
                        {`${item.artist.reduce(
                          (prev, cur) => prev + " " + cur.name,
                          ""
                        )} - ${item.album.name}`}
                      </span>
                      <span>{}</span>
                    </div>
                  </div>
                  <div className="edit"></div>
                </div>
              )
            })}
          </div>
        </div>
        {/* <div className="core-container">
          
            <div className="scroll-wrapper" ref={listDetailRef}>
            <div className="scroll-content">
              {ListData.value.map((item, index) => {
                return (
                  <div className="scroll-item" key={index}>
                    {index}
                  </div>
                )
              })}
            </div>
          </div>
          
        </div> */}
        
      </div>
    )
  },
})
