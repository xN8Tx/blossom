import { useTranslation } from 'react-i18next';

import SignForm from '@/components/sign-form/SignForm';

import style from './Empty.module.scss';

export default function Empty() {
  const { t } = useTranslation();

  return (
    <div className={style.empty}>
      <SignForm>{t('chat.justWrite')}</SignForm>
    </div>
  );
}
