import Paragraph from '../../../../../../ui/paragraphs/Paragraph';

import { useAppSelector } from '../../../../../../store';

import type { Messages } from '../../../../../../models/data';

import ReadIcon from '../../../../assets/ReadIcon.svg';
import SendedIcon from '../../../../assets/SendedIcon.svg';
import LoadingIcon from '../../../../assets/LoadingIcon.svg';

import style from './Text.module.scss';

type TextProps = {
  messages: Messages[];
  notification: number;
};

export default function Text({ messages, notification }: TextProps) {
  const lastMessage = messages[messages.length - 1];
  const userId = useAppSelector((state) => state.user.data.id);

  let messageText: string = lastMessage.message;
  if (lastMessage.message.length > 27) {
    const newMess = lastMessage.message.slice(0, 25);
    messageText = newMess + '...';
  }

  const isUserMessage = Number(userId) === lastMessage.userId;

  const isCompanionRead = Number(notification) > 0;
  const isUserMessageRead =
    !isCompanionRead && isUserMessage && lastMessage.status === true;
  const isUserMessageSend =
    !isCompanionRead && isUserMessage && lastMessage.status === false;
  const isUserMessageLoading =
    !isCompanionRead && isUserMessage && lastMessage.status === 'loading';

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
      {isUserMessageLoading && <img src={LoadingIcon} alt='' />}
    </div>
  );
}
