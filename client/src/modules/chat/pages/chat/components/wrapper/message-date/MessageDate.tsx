import { useTranslation } from 'react-i18next';
import Paragraph from '../../../../../../../ui/paragraphs/Paragraph';

import style from './MessageDate.module.scss';
import whatDayWas from '../../../utils/whatDayWas';

type MessageDate = {
  date: string;
};

export default function MessageDate({ date }: MessageDate) {
  const { t } = useTranslation();

  const readyDate = whatDayWas(date, t);

  return (
    <div className={style.wrapper}>
      <span className={style.span}></span>
      <Paragraph size='s' color='message'>
        {readyDate}
      </Paragraph>
      <span className={style.span}></span>
    </div>
  );
}
