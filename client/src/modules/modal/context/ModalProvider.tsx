import React, { useState } from 'react';
import ModalContext from './ModalContext';
import { ModalStateType } from '../models';

type ModalProviderProps = {
  children: React.ReactNode;
};

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState<ModalStateType>('idle');
  const [modalText, setModalText] = useState<string>('');

  return (
    <ModalContext.Provider
      value={{ modalState, setModalState, modalText, setModalText }}
    >
      {children}
    </ModalContext.Provider>
  );
}
