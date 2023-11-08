import Paragraph from '../../../../../../../ui/paragraphs/Paragraph';

import style from './MessageCompanion.module.scss';

type MessageCompanionProps = {
  message: string;
  date?: string;
  isDate: boolean;
  isEdit: boolean;
};

export default function MessageCompanion({
  message,
  date,
  isDate,
  isEdit,
}: MessageCompanionProps) {
  const parseDate = new Date(Number(date));
  const time = `${parseDate.getHours()}:${parseDate.getMinutes()}`;

  return (
    <div className={style.container}>
      {isDate && (
        <div className={style.time}>
          <Paragraph size='xs' color='message'>
            {time}
          </Paragraph>
        </div>
      )}
      <div className={style.wrapper} is-date={isDate.toString()}>
        <Paragraph size='x' color='user'>
          {message}
        </Paragraph>
        {isEdit && (
          <div className={style.info}>
            <Paragraph size='xs' color='message'>
              Edit
            </Paragraph>
          </div>
        )}
      </div>
    </div>
  );
}
