import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import fromDateToDay from '@chat/utils/fromDateToDay';

import style from './MessageDate.module.scss';
import { Paragraph } from 'blossom-react-ui';

type MessageDate = {
  date: string;
};

const MessageDate = memo(({ date }: MessageDate) => {
  const { t } = useTranslation();

  const readyDate = fromDateToDay(date, t);

  return (
    <div className={style.wrapper}>
      <span className={style.span}></span>
      <Paragraph size='m' weight='medium' color='dark'>
        {readyDate}
      </Paragraph>
      <span className={style.span}></span>
    </div>
  );
});

export default MessageDate;
