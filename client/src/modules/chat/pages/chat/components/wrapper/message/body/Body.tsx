import Paragraph from '@/ui/paragraphs/Paragraph';

import sendedIcon from '@chat/assets/SendedIcon.svg';
import readIcon from '@chat/assets/ReadIcon.svg';

import style from '../Message.module.scss';

type BodyProps = {
  message: string;
  isUser: boolean;
  status: boolean | 'loading';
};

export default function Body({ message, isUser, status }: BodyProps) {
  const statusUrl = status ? readIcon : sendedIcon;

  return (
    <div className={style.body}>
      <Paragraph size='x' color='user'>
        {message}
      </Paragraph>
      {isUser && <img src={statusUrl} />}
    </div>
  );
}
