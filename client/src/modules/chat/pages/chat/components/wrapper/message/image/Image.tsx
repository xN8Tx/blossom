import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import useOnScreen from '@chat/hooks/useOnScreen';

import style from '../Message.module.scss';

type ImageProps = {
  message: string;
};

export default function Image({ message }: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const isOnScreen = useOnScreen(ref);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    if (!isOnScreen) return () => {};
    if (!ref.current) return () => {};
    if (
      ref.current.src !==
      `${import.meta.env.VITE_FRONTEND_SERVER_URL}chat/${id}`
    )
      return () => {};

    let isLive = false;
    let interval;
    const liveHandler = () => {
      isLive = true;
    };

    const setImage = new Promise((resolve) => {
      document.addEventListener('mousemove', liveHandler);
      document.addEventListener('scroll', liveHandler);

      interval = setInterval(() => {
        if (isLive) return resolve((ref.current!.src = message));
      }, 300);
    });

    setImage.then(() => {
      document.removeEventListener('mousemove', liveHandler);
      document.removeEventListener('scroll', liveHandler);
      setIsLoaded(true);
      clearInterval(interval!);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, isOnScreen]);

  return (
    <div
      className={style.imageWrapper}
      is-loaded={isLoaded.toString()}
      is-image
    >
      <img src='' className={style.image} ref={ref} />
    </div>
  );
}
