import { MouseEvent, useContext, useRef, useState } from 'react';

import useOnScreen from '@chat/hooks/useOnScreen';
import MediaWindowContext from '@chat/context/media-window/MediaWindowContext';

import MuteIcon from '@chat/assets/player/MuteIcon';
import SoundIcon from '@chat/assets/player/SoundIcon';
import PauseIcon from '@chat/assets/player/PauseIcon';
import PlayIcon from '@chat/assets/player/PlayIcon';

import type { Messages } from '@/models/data';

import style from './Video.module.scss';

type VideoPropsType = {
  messageObj: Messages;
};

export default function Video({ messageObj }: VideoPropsType) {
  const { message } = messageObj;

  const { setIsOpen, setMediaUrl, setType } = useContext(MediaWindowContext);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);

  const isOnScreen = useOnScreen(wrapperRef);

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // CONTROLS
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

  // Media Window
  const handleMediaWindow = (event: MouseEvent<HTMLDivElement>) => {
    const isControls =
      (event.target as HTMLElement)?.id === 'video-message-controls';

    if (isControls) return false;

    setMediaUrl(message);
    setType('video');
    setIsOpen(true);
  };

  return (
    <div
      className={style.videoWrapper}
      ref={wrapperRef}
      is-loaded={isOnScreen.toString()}
      onClick={handleMediaWindow}
    >
      {isOnScreen && (
        <>
          <div className={style.videoControls}>
            <button
              onClick={handlePlayPause}
              className={style.muteBtn}
              id='video-message-controls'
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              onClick={handleVolumeToggle}
              className={style.playBtn}
              id='video-message-controls'
            >
              {isMuted ? <MuteIcon /> : <SoundIcon />}
            </button>
          </div>
          <video
            className={style.videoElement}
            ref={videoRef}
            muted={isMuted}
            onEnded={handleEndVideo}
          >
            <source src={message} ref={sourceRef} type='video/webm' />
            Your browser does not support video!
          </video>
        </>
      )}
    </div>
  );
}
