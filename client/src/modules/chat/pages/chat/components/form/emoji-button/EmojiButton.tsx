import { MouseEvent, useContext } from 'react';

import EmojiContext from '@chat/context/emoji/EmojiContext';
import EmojiIcon from '@chat/assets/EmojiIcon';

import style from '../Form.module.scss';

const EmojiButton = () => {
  const { isEmojiOpen, setIsEmojiOpen } = useContext(EmojiContext);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEmojiOpen(!isEmojiOpen);
  };

  return (
    <button className={style.emojiButton} onClick={onClick}>
      <EmojiIcon />
    </button>
  );
};

export default EmojiButton;
