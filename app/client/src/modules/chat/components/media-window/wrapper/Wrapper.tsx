import { MouseEvent, useContext } from 'react';

import MediaWindowContext from '@chat/context/media-window/MediaWindowContext';

import Image from '../image/Image';
import Video from '../video/Video';

import style from './Wrapper.module.scss';

export default function Wrapper() {
  const { type, setIsOpen } = useContext(MediaWindowContext);

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <div className={style.Wrapper} id='media-window-wrapper'>
      <div className={style.BtnWrapper}>
        <button className={style.CloseBtn} onClick={handleClose}>
          <span></span>
        </button>
      </div>
      {type === 'image' && <Image />}
      {type === 'video' && <Video />}
    </div>
  );
}
