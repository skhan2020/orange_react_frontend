import React, { useEffect, useState } from 'react';
import EmptyUI from '../../EmptyUI';
import { videoPlayerListSelector, videosFetchedSelector } from '../../../../../redux/selectors/index'
import { translate } from '../../../../../localization/service' 
import { retrieveVideoList } from '../../../../../services/video'
import { useSelector } from 'react-redux'
import Player from './components/Player';

import '../Notes/index.scss';
import '../../../Auth/index.scss';

const VideoPlayer = () => {
  const videoPlayerList = useSelector(videoPlayerListSelector);
  const [selectedVideo, setSelectedVideo] = useState(videoPlayerList[0]);
  const videosFetched = useSelector(videosFetchedSelector);
  
  useEffect(() => {
    if (!videosFetched) {
        retrieveVideoList();
      }
    }, [videosFetched]
  )
  
  useEffect(() => {
    if (videoPlayerList && videoPlayerList.length) {
      setSelectedVideo(videoPlayerList[0]);
      }
    }, [videoPlayerList]
  )

  const updateSelectedVideoPlayer = item => {
    setSelectedVideo(item);
  }

  return (
    <>
      <div className="header_box">
        <div className="page_heading">{translate("video_player")}</div>
      </div>
      <div className="list_page">
        {!videoPlayerList || videoPlayerList.length === 0 ? <EmptyUI message={translate("empty_video_message")} /> :
          <>
            <div className="note_list">
              { videoPlayerList.map(item => {
                return <div className="note_list_item" key={item._id}>
                  {item.showCategory && 
                    <div className="note_category">{item.category}</div> }
                    <div className="note_title" onClick={() => updateSelectedVideoPlayer(item)}>{item.title}</div>
                  </div>
                }
              )}
            </div>
            <Player selectedVideo={selectedVideo} detailsMode={true} ></Player>
          </>
        }
      </div>
    </>
  )
}

export default VideoPlayer;