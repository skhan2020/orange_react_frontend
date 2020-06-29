import React, { useEffect, useState } from 'react';
import EmptyUI from '../../EmptyUI';
import { videoPlayerListSelector, selectedVideoSelector } from '../../../../../redux/selectors/index'
import { translate } from '../../../../../localization/service' 
import { retrieveVideoList } from '../../../../../services/video'
import { useSelector } from 'react-redux'
import Player from './components/Player';

import '../Notes/index.scss';
import '../../../Auth/index.scss';

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState();
  const videoPlayerList = useSelector(videoPlayerListSelector);
  
  useEffect(() => {
    retrieveVideoList();
    }, []
  )
  const updateSelectedVideoPlayer = item => {
    setSelectedVideo(item);
  }
  
  return (
    <>
      <div className="header_box">
        <div className="page_heading">{translate("video_player")}</div>
      </div>
      <div className="note_page">
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