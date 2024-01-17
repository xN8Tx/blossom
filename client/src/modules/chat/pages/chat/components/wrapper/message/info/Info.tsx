import { useTranslation } from 'react-i18next';
import { Paragraph } from 'blossom-react-ui';

import style from '../Message.module.scss';

export default function Info() {
  const { t } = useTranslation();

  return (
    <div className={style.info}>
      <Paragraph size='m' weight='regular' color='dark'>
        {t('chat.edited')}
      </Paragraph>
    </div>
  );
}
