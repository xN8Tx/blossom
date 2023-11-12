import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../../../store';
import { selectMessage } from '../../../../../store/chatSelector';
import MenuContext from '../../../../../context/MenuContext';

import Paragraph from '../../../../../../../ui/paragraphs/Paragraph';

import style from '../Form.module.scss';

export default function ChangeMessage() {
  const { t } = useTranslation();

  const { id: chatId } = useParams();
  const messageId = useContext(MenuContext).editMessageId;
  const setEditMessageId = useContext(MenuContext).setEditMessageId;

  const message = useAppSelector((state) =>
    selectMessage(state, Number(messageId), Number(chatId))
  );

  const onClose = () => {
    setEditMessageId('');
  };

  if (!message) return <></>;

  return (
    <div className={style.changeWrapper}>
      <div className={style.changeWrapperText}>
        <Paragraph color='message' size='xs'>
          {t('chat.editMessage')}
        </Paragraph>
        <Paragraph color='user' size='x'>
          {message.message}
        </Paragraph>
      </div>
      <div className={style.changeClose} onClick={onClose}>
        <span></span>
      </div>
    </div>
  );
}
