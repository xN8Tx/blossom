import Paragraph from '@/ui/paragraphs/Paragraph';

import timeHandler from '@/modules/chat/utils/timeHandler';

import style from '../Message.module.scss';

type TimeProps = {
  date: string;
};

export default function Time({ date }: TimeProps) {
  const time = timeHandler(date);

  return (
    <div className={style.time}>
      <Paragraph size='xs' color='message'>
        {time}
      </Paragraph>
    </div>
  );
}
