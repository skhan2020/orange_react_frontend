// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react'
import { findDOMNode } from 'react-dom'
import { Button } from 'antd'
import { deleteVideo } from '../../../../../../../services/video'
import screenfull from 'screenfull'

import './range.scss'
import './index.scss'

import ReactPlayer from 'react-player';
import Duration from './Duration'

const Player = props => {
  const selectedVideo = props.selectedVideo;
  const [playing, setPlaying] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playedinseconds, setPlayedinseconds] = useState(0);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const playerEl = useRef(null);

  useEffect(() => {
    setPlaying(false);
    setPlayed(0);
    setDuration(0);
  }, [selectedVideo]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  }

  const handleVolumeChange = e => { 
    setVolume(parseFloat(e.target.value));
  }

  const handleSetPlaybackRate = e => {
    setPlaybackRate(parseFloat(e.target.value));
  }

  const handlePlay = () => {
    console.log('onPlay')
    setPlaying(true);
  }

  const handlePause = () => {
    console.log('onPause')
    setPlaying(false)
  }

  const handleSeekMouseDown = e => {
    setSeeking(true);
  }

  const handleSeekChange = e => {
    setPlayed(parseFloat(e.target.value))
  }

  const handleSeekMouseUp = e => {
    setSeeking(false)
    playerEl.current.seekTo(parseFloat(e.target.value))
  }

  const handleDeleteVideo = () => {
    deleteVideo(selectedVideo._id);
  }

  const handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      setPlayedinseconds(state.playedSeconds);
      setPlayed(state.played);
    }
  }

  const handleDuration = (duration) => {
    console.log('onDuration', duration)
    setDuration(duration)
  }

  const handleClickFullscreen = () => {
   screenfull.request(findDOMNode(playerEl.current));
  }

  if (!selectedVideo) {
    return null ;
  }
    return (
      <div className="player_container">
        <div className='player-wrapper'>
          <ReactPlayer
            ref={playerEl}
            className='react-player'
            width='100%'
            height='100%'
            url={selectedVideo.link}
            playing={playing}
            playbackRate={playbackRate}
            volume={volume}
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            onPlay={handlePlay}
            onPause={handlePause}
            onBuffer={() => console.log('onBuffer')}
            onSeek={e => console.log('onSeek', e)}
            onError={e => console.log('onError', e)}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
        </div>
        <div className="player_controls">
        <div className="player_label"><Duration seconds={playedinseconds} />/<Duration seconds={duration} /></div>
          <input
            type='range' min={0} max={0.999999} step='any'
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          <Button className="rate_button" onClick={handleSetPlaybackRate} value={1}>1x</Button>
          <Button className="rate_button" onClick={handleSetPlaybackRate} value={1.5}>1.5x</Button>
          <Button className="rate_button" onClick={handleSetPlaybackRate} value={2}>2x</Button>
        </div>
        <div className="player_controls">
          <div className="player_label" >Volume</div>
          <input type='range' min={0} max={1} step='any' value={volume} onChange={handleVolumeChange} />
        </div>
        <Button className="play_button" onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</Button>
        <Button className="play_button" onClick={handleClickFullscreen}>Fullscreen</Button>
        <Button className="play_button" onClick={handleDeleteVideo}>Delete</Button>
      </div>
    )
  }
export default Player;