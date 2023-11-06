import Paragraph from '../../../../../../ui/paragraphs/Paragraph';

import { useAppSelector } from '../../../../../../store';

import type { Messages } from '../../../../../../models/data';

import ReadIcon from '../../../../assets/ReadIcon.svg';
import SendedIcon from '../../../../assets/SendedIcon.svg';
import LoadingIcon from '../../../../assets/LoadingIcon.svg';

import style from './Text.module.scss';

type TextProps = {
  messages: Messages[];
};

export default function Text({ messages }: TextProps) {
  const lastMessage = messages[messages.length - 1];
  const userId = useAppSelector((state) => state.user.data.id);

  const messageText = lastMessage.message;

  const isUserMessage = Number(userId) === lastMessage.userId;

  const isUserMessageRead = isUserMessage && lastMessage.status === true;
  const isUserMessageSend = isUserMessage && lastMessage.status === false;
  const isUserMessageLoading =
    isUserMessage && lastMessage.status === 'loading';
  const isCompanionRead = !isUserMessage && lastMessage.status === false;

  return (
    <div className={style.text}>
      <Paragraph size='m' color='message'>
        {messageText}
      </Paragraph>
      {isUserMessageRead && <img src={ReadIcon} alt='' />}
      {isUserMessageSend && <img src={SendedIcon} alt='' />}
      {isUserMessageLoading && <img src={LoadingIcon} alt='' />}
      {isCompanionRead && (
        <div className={style.icon}>
          <Paragraph size='s' color='user'>
            {messages.length}
          </Paragraph>
        </div>
      )}
    </div>
  );
}
