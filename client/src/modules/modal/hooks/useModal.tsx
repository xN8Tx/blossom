import { useContext } from 'react';

import type { ModalStateType } from '../models';

import ModalContext from '../context/ModalContext';

const useModal = () => {
  const { setModalState, setModalText } = useContext(ModalContext);

  return (
    newState: ModalStateType,
    newModalText: string,
    time: number = 5000
  ) => {
    setModalState(newState);
    setModalText(newModalText);

    if (time !== 0) {
      setTimeout(() => {
        setModalState('idle');
        setModalText('');
      }, time);
    }
  };
};

export default useModal;
