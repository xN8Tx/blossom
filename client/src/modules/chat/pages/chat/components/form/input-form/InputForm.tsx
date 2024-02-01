import { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from 'blossom-react-ui';
import { useParams } from 'react-router-dom';

import {
  editMessage,
  sendMessage,
} from '@chat/store/thunk/chat-action/chatAction';
import { useAppDispatch } from '@/store';

import InputContext from '@chat/context/input/InputContext';
import MenuContext from '@chat/context/menu/MenuContext';

import isMessageEmpty from '@chat/utils/isMessageEmpty';

import EmojiButton from '../emoji-button/EmojiButton';
import ButtonForm from '../button-form/ButtonForm';
import Input from '../input/Input';

import style from './InputForm.module.scss';

export default function InputForm() {
  const textboxRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { editMessageId, setEditMessageId } = useContext(MenuContext);
  const { inputValue, setInputValue } = useContext(InputContext);

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

  return (
    <form className={style.form}>
      <EmojiButton />
      <Input sendMyMessage={sendMyMessage} />
      <Paragraph color='dark' size='l' weight='medium'>
        {t('chat.writeMessage')}
      </Paragraph>
      <ButtonForm sendMyMessage={sendMyMessage} />
    </form>
  );
}
