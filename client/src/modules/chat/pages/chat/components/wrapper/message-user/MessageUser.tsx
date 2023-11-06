import Paragraph from '../../../../../../../ui/paragraphs/Paragraph';

import style from './MessageUser.module.scss';

type MessageUserProps = {
  message: string;
};

export default function MessageUser({ message }: MessageUserProps) {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Paragraph size='x' color='user'>
          {message}
        </Paragraph>
      </div>
    </div>
  );
}
