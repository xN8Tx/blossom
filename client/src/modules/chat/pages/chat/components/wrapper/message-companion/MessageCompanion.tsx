import Paragraph from '../../../../../../../ui/paragraphs/Paragraph';

import style from './MessageCompanion.module.scss';

type MessageCompanionProps = {
  message: string;
};

export default function MessageCompanion({ message }: MessageCompanionProps) {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Paragraph size='x' color='message'>
          {message}
        </Paragraph>
      </div>
    </div>
  );
}
