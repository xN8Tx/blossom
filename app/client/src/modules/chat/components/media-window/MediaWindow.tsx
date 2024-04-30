import { useContext, useEffect } from 'react';

import MediaWindowContext from '../../context/media-window/MediaWindowContext';

import style from './MediaWindow.module.scss';
import Wrapper from './wrapper/Wrapper';

export default function MediaWindow() {
  const { isOpen, setIsOpen } = useContext(MediaWindowContext);

  useEffect(() => {
    const closeHandler = (event: KeyboardEvent) => {
      event.key === 'Escape' && setIsOpen(false);
    };
    document.addEventListener('keydown', closeHandler);

    return () => {
      document.removeEventListener('keydown', closeHandler);
    };
  });

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className={style.Container}>
      <Wrapper />
    </div>
  );
}
