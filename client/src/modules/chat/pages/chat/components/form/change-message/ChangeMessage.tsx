import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Paragraph } from 'blossom-react-ui';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store';
import selectMessageByMessageId from '@chat/store/selectors/selectMessageByMessageId';

import MenuContext from '@/modules/chat/context/menu/MenuContext';

import style from './ChangeMessage.module.scss';

export default function ChangeMessage() {
  const { t } = useTranslation();

  const { id: chatId } = useParams();
  const messageId = useContext(MenuContext).editMessageId;
  const setEditMessageId = useContext(MenuContext).setEditMessageId;

  const message = useAppSelector((state) =>
    selectMessageByMessageId(state, Number(messageId), Number(chatId))
  );

  const onClose = () => {
    setEditMessageId('');
  };

  if (!message) return <></>;

  return (
    <div className={style.changeWrapper}>
      <div className={style.changeWrapperText}>
        <Paragraph color='dark' size='m' weight='regular'>
          {t('chat.editMessage')}
        </Paragraph>
        <Paragraph color='primary' size='m' weight='medium'>
          {message.message}
        </Paragraph>
      </div>
      <div className={style.changeClose} onClick={onClose}>
        <span></span>
      </div>
    </div>
  );
}
