import { useTranslation } from 'react-i18next';
import Paragraph from '../../../../../../../../ui/paragraphs/Paragraph';

import style from '../Message.module.scss';

export default function Info() {
  const { t } = useTranslation();

  return (
    <div className={style.info}>
      <Paragraph size='xs' color='message'>
        {t('chat.edited')}
      </Paragraph>
    </div>
  );
}
