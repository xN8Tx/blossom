import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

import MediaWindowContext from '@chat/context/media-window/MediaWindowContext';

import PlayIcon from '@chat/assets/player/PlayIcon';
import MuteIcon from '@chat/assets/player/MuteIcon';
import PauseIcon from '@chat/assets/player/PauseIcon';
import SoundIcon from '@chat/assets/player/SoundIcon';

import style from './Video.module.scss';

export default function Video() {
  const { mediaUrl } = useContext(MediaWindowContext);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // HANDLERS
  const handlePlayPause = () => {
    if (!videoRef.current) return null;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeToggle = () => {
    if (!videoRef.current) return null;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleEndVideo = () => {
    setIsPlaying(false);
  };

  const handleSeekBarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return () => {};

    const newTime = Number(event.target.value);
    videoRef.current!.currentTime = newTime;

    setCurrentTime(newTime);
  };

  // USE EFFECT
  useEffect(() => {
    if (!videoRef.current) return () => {};

    setDuration(Number(videoRef.current!.duration));

    const handleTimeUpdate = () => {
      setCurrentTime(Number(videoRef.current!.currentTime));
    };

    videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <div className={style.videoContainer}>
      <video
        className={style.Video}
        controls={false}
        muted={isMuted}
        ref={videoRef}
        onClick={handlePlayPause}
      >
        <source src={mediaUrl} onEnded={handleEndVideo} />
        Your browser doesn't support video!
      </video>
      <div className={style.controlsWrapper} style={{ width: '100%' }}>
        <button onClick={handlePlayPause} className={style.muteBtn}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <input
          type='range'
          className={style.range}
          value={currentTime}
          step='any'
          max={duration.toString()}
          min='0'
          onChange={handleSeekBarChange}
        />
        <button onClick={handleVolumeToggle} className={style.playBtn}>
          {isMuted ? <MuteIcon /> : <SoundIcon />}
        </button>
      </div>
    </div>
  );
}
