import { defineComponent, ref, unref } from "vue"
import { props } from "./define"

import { ApiPlayListDetail } from "api"

import SongList from "components/SongList"
import Header from "components/Header"

import "./index.less"

export default defineComponent({
  props,
  components: { SongList },
  setup(props) {
    let detail = ref({})

    function getPlayListDetail() {
      ApiPlayListDetail(3159790268).then((res) => {
        let { coverImgUrl, name, trackIds } = res.data.playlist
        let { avatarUrl, nickname } = res.data.playlist.creator
        detail.value = { avatarUrl, nickname, name, coverImgUrl, trackIds }
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
              filter: 'blur(100px)',
              width: "100%",
              height: "300px",
              // boxSizing: 'border-box'
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
                <img style={{width: '30px', height: '30px', borderRadius: '50%'}} src={_detail.avatarUrl} alt=""/>
              </div>
            </div>
          </div>
          <div className="edit"></div>
        </div>
      )
    }

    return () => (
      <div>
        <Header mode="list-detail"></Header>
        {Detail()}
        <SongList></SongList>
      </div>
    )
  },
})
