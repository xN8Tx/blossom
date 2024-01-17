import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import selectMessageByMessageId from '@chat/store/selectors/selectMessageByMessageId';
import { editMessage, sendMessage } from '@chat/store/chatThunk';
import { useAppDispatch, useAppSelector } from '@/store';
import MenuContext from '@chat/context/MenuContext';

import isMessageEmpty from '@chat/utils/isMessageEmpty';

import ButtonForm from '../button-form/ButtonForm';

import type { KeyboardEvent, ChangeEvent, MouseEvent } from 'react';

import style from '../Form.module.scss';
import { Paragraph } from 'blossom-react-ui';

export default function InputForm() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const textboxRef = useRef<HTMLDivElement>(null);
  const { editMessageId, setEditMessageId } = useContext(MenuContext);

  const message = useAppSelector((state) =>
    selectMessageByMessageId(state, Number(editMessageId), Number(id))
  );

  const [myMessage, setMyMessage] = useState<string>('');

  const isContent = `${myMessage.length > 0}`;

  // HANDLER TO MY DIV INPUT
  const onMyMessageChange = (event: ChangeEvent<HTMLDivElement>) => {
    setMyMessage(event.currentTarget.textContent!);
  };

  // SEND MESSAGE HANDLER
  const sendMyMessage = () => {
    if (myMessage.length === 0) return 0;
    if (isMessageEmpty(myMessage)) return 0;

    if (editMessageId === '') {
      const title = {
        message: myMessage,
        chatId: id!,
      };

      dispatch(sendMessage(title));
    } else {
      const title = {
        chatId: id!,
        message: {
          id: editMessageId,
          message: myMessage,
        },
      };

      dispatch(editMessage(title));
      setEditMessageId('');
    }
    setMyMessage('');
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

  useEffect(() => {
    setMyMessage('');
    textboxRef.current!.textContent = '';
  }, [id]);

  useEffect(() => {
    if (message) {
      setMyMessage(message.message);
      textboxRef.current!.textContent = message.message;
    }
  }, [message]);

  return (
    <form className={style.form}>
      <div
        is-content={isContent}
        contentEditable
        role='textbox'
        onInput={onMyMessageChange}
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
