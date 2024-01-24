import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from 'blossom-react-ui';
import { useParams } from 'react-router-dom';

import InputContext from '@chat/context/input/InputContext';
import EmojiContext from '@chat/context/emoji/EmojiContext';
import EmojiButton from '../emoji-button/EmojiButton';

import MenuContext from '@chat/context/menu/MenuContext';
import ButtonForm from '../button-form/ButtonForm';

import selectMessageByMessageId from '@chat/store/selectors/selectMessageByMessageId';
import { editMessage, sendMessage } from '@chat/store/chatThunk';
import { useAppDispatch, useAppSelector } from '@/store';

import isMessageEmpty from '@chat/utils/isMessageEmpty';

import type { KeyboardEvent, ChangeEvent, MouseEvent } from 'react';

import style from '../Form.module.scss';

export default function InputForm() {
  const textboxRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { editMessageId, setEditMessageId } = useContext(MenuContext);
  const { inputValue, setInputValue } = useContext(InputContext);
  const { setIsEmojiOpen } = useContext(EmojiContext);

  const isContent = `${inputValue.length > 0}`;

  const message = useAppSelector((state) =>
    selectMessageByMessageId(state, Number(editMessageId), Number(id))
  );

  // HANDLER TO MY DIV INPUT
  const onMyMessageChange = (event: ChangeEvent<HTMLDivElement>) => {
    setInputValue(event.currentTarget.textContent!);
  };

  // SEND MESSAGE HANDLER
  const sendMyMessage = () => {
    if (inputValue.length === 0) return 0;
    if (isMessageEmpty(inputValue)) return 0;

    if (editMessageId === '') {
      const title = {
        message: inputValue,
        chatId: id!,
      };

      dispatch(sendMessage(title));
    } else {
      const title = {
        chatId: id!,
        message: {
          id: editMessageId,
          message: inputValue,
        },
      };

      dispatch(editMessage(title));
      setEditMessageId('');
    }
    setInputValue('');
    textboxRef.current!.textContent = '';
  };

  // BUTTON HANDLER
  const onMyMessageSend = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    sendMyMessage();
  };

  // ENTER TO SAND MESSAGE
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

  useEffect(() => {
    const isDifMessage =
      typeof textboxRef.current!.textContent === 'string' &&
      textboxRef.current!.textContent !== inputValue;

    if (isDifMessage) {
      textboxRef.current!.textContent = inputValue;
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValue('');
    textboxRef.current!.textContent = '';
  }, [id, setInputValue]);

  useEffect(() => {
    if (message) {
      setInputValue(message.message);
      textboxRef.current!.textContent = message.message;
    }
  }, [message, setInputValue]);

  return (
    <form className={style.form}>
      <EmojiButton />
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
      <Paragraph color='dark' size='l' weight='medium'>
        {t('chat.writeMessage')}
      </Paragraph>
      <ButtonForm onMyMessageSend={onMyMessageSend} />
    </form>
  );
}
