import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../../../store';
import { editMessage, sendMessage } from '../../../../../store/chatThunk';

import isMessageEmpty from '../../../utils/isMessageEmpty';

import Paragraph from '../../../../../../../ui/paragraphs/Paragraph';
import ButtonForm from '../button-form/ButtonForm';

import type { Messages } from '../../../../../../../models/data';
import type { KeyboardEvent, ChangeEvent } from 'react';

import style from '../Form.module.scss';
import MenuContext from '../../../../../context/MenuContext';
import { selectMessage } from '../../../../../store/chatSelector';

export default function InputForm() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const textboxRef = useRef<HTMLDivElement>(null);
  const { editMessageId, setEditMessageId } = useContext(MenuContext);

  const message = useAppSelector((state) =>
    selectMessage(state, Number(editMessageId), Number(id))
  );

  const userId = useAppSelector((state) => state.user.data!.id);

  const [myMessage, setMyMessage] = useState<string>('');

  const isContent = `${myMessage.length > 0}`;

  const onFormClick = (event: React.MouseEvent) => event.preventDefault();

  const onMyMessageChange = (event: ChangeEvent<HTMLDivElement>) => {
    setMyMessage(event.currentTarget.textContent!);
  };

  const onMyMessageSend = () => {
    if (myMessage.length === 0) return 0;
    if (isMessageEmpty(myMessage)) return 0;

    if (editMessageId === '') {
      const title: Omit<Messages, 'id'> = {
        userId: userId!,
        message: myMessage,
        date: Date.now().toString(),
        status: 'loading',
        isEdit: false,
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

  const onEnterClick = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      onMyMessageSend();
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
    <form className={style.form} onClick={onFormClick}>
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
      <Paragraph color='message' size='l'>
        {t('chat.writeMessage')}
      </Paragraph>
      <ButtonForm onMyMessageSend={onMyMessageSend} />
    </form>
  );
}
