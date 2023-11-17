import { useEffect, useRef, useState } from 'react';
import style from '../Message.module.scss';
import config from '../../../../../../../../config';
import { useParams } from 'react-router-dom';
import useOnScreen from '../../../../../../hooks/useOnScreem';

type ImageProps = {
  message: string;
};

export default function Image({ message }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);
  const isOnScreen = useOnScreen(ref);

  const { id } = useParams();

  useEffect(() => {
    if (!isOnScreen) return () => {};
    if (!ref.current) return () => {};
    if (ref.current.src !== `${config.siteIp}chat/${id}`) return () => {};

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
