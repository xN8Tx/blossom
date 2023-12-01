import { useTranslation } from 'react-i18next';

import Heading from '@/ui/headings/Heading';
import User from '../user/User';

import style from './Heading.module.scss';

export default function Headings() {
  const { t } = useTranslation();
  return (
    <div className={style.wrapper}>
      <Heading size='l'>{t('title.settings')}</Heading>
      <User />
    </div>
  );
}
