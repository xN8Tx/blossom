import { useContext } from 'react';

import ModalContext from './context/ModalContext';

import Paragraph from '../../ui/paragraphs/Paragraph';

import style from './Modal.module.scss';

export default function Modal() {
  const { modalState, modalText } = useContext(ModalContext);

  return (
    <div className={style.wrapper} modal-state={modalState}>
      {modalState !== 'idle' && (
        <Paragraph size='l' color='user'>
          {modalText}
        </Paragraph>
      )}
    </div>
  );
}
