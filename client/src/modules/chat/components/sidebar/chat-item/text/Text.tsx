import Paragraph from '@/ui/paragraphs/Paragraph';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store';

import isMessageImage from '@chat/utils/isMessageImage';

import ReadIcon from '@chat/assets/ReadIcon.svg';
import SendedIcon from '@chat/assets/SendedIcon.svg';

import type { Messages } from '@/models/data';

import style from './Text.module.scss';

type TextProps = {
  messages: Messages[];
  notification: number;
};

export default function Text({ messages, notification }: TextProps) {
  const { t } = useTranslation();
  const userId = useAppSelector((state) => state.user.data.id);

  if (messages.length === 0) {
    return <></>;
  }

  const lastMessage = messages[messages.length - 1];
  const isImage = isMessageImage(lastMessage.message);

  let messageText: string = lastMessage.message;
  if (!isImage && lastMessage.message.length > 27) {
    const newMess = lastMessage.message.slice(0, 25);
    messageText = newMess + '...';
  }

  const isCompanionRead = Number(notification) > 0;
  const isUserMessage = Number(userId) === Number(lastMessage.userId);

  const isUserMessageRead = isUserMessage && lastMessage.status === true;
  const isUserMessageSend = isUserMessage && lastMessage.status === false;

  return (
    <div className={style.text}>
      <Paragraph size='m' color='message'>
        {isImage ? <b>{t('chat.image')}</b> : messageText}
      </Paragraph>
      {isCompanionRead && (
        <div className={style.icon}>
          <Paragraph size='s' color='user'>
            {notification}
          </Paragraph>
        </div>
      )}
      {isUserMessageRead && <img src={ReadIcon} alt='' />}
      {isUserMessageSend && <img src={SendedIcon} alt='' />}
    </div>
  );
}
