import { useTranslation } from 'react-i18next';
import { Paragraph } from 'blossom-react-ui';

import DownloadIcon from '@chat/assets/DownloadIcon';

import sendedIcon from '@chat/assets/SendedIcon.svg';
import readIcon from '@chat/assets/ReadIcon.svg';

import type { Messages } from '@/models/data';

import style from '../Message.module.scss';

type FilePropsType = {
  messageObj: Messages;
  isUser: boolean;
};

export default function File({ messageObj, isUser }: FilePropsType) {
  const { t } = useTranslation();
  const statusUrl = status ? readIcon : sendedIcon;

  return (
    <div className={style.fileWrapper} is-user={`${isUser}`}>
      <a href={messageObj.message} download>
        <DownloadIcon />
      </a>
      <div className={style.fileTextWrapper}>
        <Paragraph size='m' weight='medium' color='primary'>
          {t('chat.image')}
        </Paragraph>
        {isUser && <img src={statusUrl} />}
      </div>
    </div>
  );
}
