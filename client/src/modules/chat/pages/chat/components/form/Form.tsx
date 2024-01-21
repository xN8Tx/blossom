import InputForm from './input-form/InputForm';
import ChangeMessage from './change-message/ChangeMessage';

import style from './Form.module.scss';
import { useContext } from 'react';
import EmojiContext from '@/modules/chat/context/emoji/EmojiContext';

export default function Form() {
  const { isEmojiOpen } = useContext(EmojiContext);

  return (
    <div className={style.container} is-emoji-open={`${isEmojiOpen}`}>
      <ChangeMessage />
      <div className={style.wrapper}>
        <InputForm />
      </div>
    </div>
  );
}
