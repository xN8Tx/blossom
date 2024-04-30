import { useContext, useState } from 'react';

import MediaWindowContext from '@chat/context/media-window/MediaWindowContext';

import style from './Image.module.scss';

export default function Image() {
  const { mediaUrl } = useContext(MediaWindowContext);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleImageLoaded = () => setIsLoaded(true);

  return (
    <div className={style.ImageWrapper} is-loaded={isLoaded}>
      <img
        src={mediaUrl}
        className={style.Image}
        onLoad={handleImageLoaded}
        alt='Selected image'
      />
    </div>
  );
}
