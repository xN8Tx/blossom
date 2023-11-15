import Paragraph from '../../../../../../ui/paragraphs/Paragraph';

import { useAppSelector } from '../../../../../../store';

import type { Messages } from '../../../../../../models/data';

import ReadIcon from '../../../../assets/ReadIcon.svg';
import SendedIcon from '../../../../assets/SendedIcon.svg';

import style from './Text.module.scss';

type TextProps = {
  messages: Messages[];
  notification: number;
};

export default function Text({ messages, notification }: TextProps) {
  const userId = useAppSelector((state) => state.user.data.id);

  if (messages.length === 0) {
    return <></>;
  }

  const lastMessage = messages[messages.length - 1];

  let messageText: string = lastMessage.message;
  if (lastMessage.message.length > 27) {
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
        {messageText}
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
