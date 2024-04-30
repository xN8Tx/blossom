import { useContext } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import EmojiContext from '@/modules/chat/context/emoji/EmojiContext';

import style from './Emoji.module.scss';
import InputContext from '@/modules/chat/context/input/InputContext';

export default function Emoji() {
  const { isEmojiOpen } = useContext(EmojiContext);
  const { setInputValue } = useContext(InputContext);

  const onEmojiClick = (e: EmojiClickData) => {
    setInputValue((v: string) => v + e.emoji);
  };

  return (
    <div className={style.EmojiWrapper} is-open={`${isEmojiOpen}`}>
      <EmojiPicker
        searchDisabled={true}
        onEmojiClick={onEmojiClick}
        lazyLoadEmojis={true}
      />
    </div>
  );
}
