import { useTranslation } from 'react-i18next';
import { Heading } from 'blossom-react-ui';

import User from '../user/User';

import style from './Heading.module.scss';

export default function Headings() {
  const { t } = useTranslation();
  return (
    <div className={style.wrapper}>
      <Heading size='m' weight='bold' color='primary'>
        {t('title.settings')}
      </Heading>
      <User />
    </div>
  );
}
