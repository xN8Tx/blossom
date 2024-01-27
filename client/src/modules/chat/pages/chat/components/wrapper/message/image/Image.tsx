import { useEffect, useRef, useState } from 'react';

import useOnScreen from '@chat/hooks/useOnScreen';

import style from '../Message.module.scss';

type ImageProps = {
  message: string;
};

export default function Image({ message }: ImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isOnScreen = useOnScreen(wrapperRef);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!isOnScreen) return () => {};
    if (!imageRef.current) return () => {};
    if (isLoaded) return () => {};

    imageRef.current.src = message;
  }, [wrapperRef, isOnScreen, message]);

  return (
    <div
      className={style.imageWrapper}
      is-loaded={isLoaded.toString()}
      ref={wrapperRef}
    >
      <img src='' className={style.image} ref={imageRef} onLoad={onLoad} />
    </div>
  );
}
