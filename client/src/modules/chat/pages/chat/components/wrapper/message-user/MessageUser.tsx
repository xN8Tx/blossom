import Paragraph from '../../../../../../../ui/paragraphs/Paragraph';

import sendedIcon from '../../../../../assets/SendedIcon.svg';
import readIcon from '../../../../../assets/ReadIcon.svg';

import style from './MessageUser.module.scss';

type MessageUserProps = {
  message: string;
  date?: string;
  isDate: boolean;
  status: boolean;
  isEdit: boolean;
};

export default function MessageUser({
  message,
  date,
  isDate,
  status,
  isEdit,
}: MessageUserProps) {
  const parseDate = new Date(Number(date));
  const time = `${parseDate.getHours()}:${parseDate.getMinutes()}`;

  const statusUrl = status ? readIcon : sendedIcon;

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
        <div className={style.body}>
          <Paragraph size='x' color='user'>
            {message}
          </Paragraph>
          <img src={statusUrl} />
        </div>
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
