import { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/store';
import selectMessageByMessageId from '@chat/store/selectors/selectMessageByMessageId';

import InputContext from '@chat/context/input/InputContext';
import EmojiContext from '@chat/context/emoji/EmojiContext';
import MenuContext from '@chat/context/menu/MenuContext';

import type { ChangeEvent, KeyboardEvent } from 'react';

import style from './Input.module.scss';

type InputPropsType = {
  sendMyMessage: () => void;
};

export default function Input({ sendMyMessage }: InputPropsType) {
  const textboxRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const { inputValue, setInputValue } = useContext(InputContext);
  const { setIsEmojiOpen } = useContext(EmojiContext);
  const { editMessageId } = useContext(MenuContext);

  const message = useAppSelector((state) =>
    selectMessageByMessageId(state, Number(editMessageId), Number(id))
  );

  const isContent = `${inputValue.length > 0}`;

  /*
    Handlers
  */
  // HANDLER TO MY DIV INPUT
  const onMyMessageChange = (event: ChangeEvent<HTMLDivElement>) => {
    setInputValue(event.currentTarget.textContent!);
  };
  // ENTER TO SEND MESSAGE
  const onEnterClick = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMyMessage();
    }
  };
  // TURN OFF EMOJI WHEN KEYBOARD
  const onFocusHandler = () => {
    setIsEmojiOpen(false);
  };

  /*
    USE EFFECTS
  */
  // Set edit message text to input
  useEffect(() => {
    if (message) {
      setInputValue(message.message);
      textboxRef.current!.textContent = message.message;
    }
  }, [message, setInputValue]);
  // To correct set emoji to input
  useEffect(() => {
    const isDifMessage =
      typeof textboxRef.current!.textContent === 'string' &&
      textboxRef.current!.textContent !== inputValue;

    if (isDifMessage) {
      textboxRef.current!.textContent = inputValue;
    }
  }, [inputValue]);
  // To delete text when u change chat
  useEffect(() => {
    setInputValue('');
    textboxRef.current!.textContent = '';
  }, [id, setInputValue]);

  return (
    <div
      id='ChatInput'
      is-content={isContent}
      contentEditable
      role='textbox'
      onInput={onMyMessageChange}
      onFocus={onFocusHandler}
      onKeyDown={onEnterClick}
      className={style.input}
      tabIndex={1}
      ref={textboxRef}
    ></div>
  );
}
