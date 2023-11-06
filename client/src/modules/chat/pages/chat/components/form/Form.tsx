import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import style from './Form.module.scss';
import ClipIcon from '../../../../assets/ClipIcon';
import SendIcon from '../../../../assets/SendIcon';
import Paragraph from '../../../../../../ui/paragraphs/Paragraph';
import isMessageEmpty from '../../utils/isMessageEmpty';
import { Messages } from '../../../../../../models/data';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { useParams } from 'react-router-dom';
import { sendMessage } from '../../../../store/chatThunk';

export default function Form() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const textboxRef = useRef<HTMLDivElement>(null);

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

    const title: Omit<Messages, 'id'> = {
      userId: userId!,
      message: myMessage,
      date: Date.now().toString(),
      status: 'loading',
      isEdit: false,
      chatId: id!,
    };

    dispatch(sendMessage(title));
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

  return (
    <div className={style.wrapper}>
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
        <div className={style.buttons}>
          <button className={style.button}>
            <ClipIcon />
          </button>
          <button
            className={style.button}
            onClick={onMyMessageSend}
            type='submit'
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
}
