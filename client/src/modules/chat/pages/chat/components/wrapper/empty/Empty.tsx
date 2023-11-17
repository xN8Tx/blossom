import { useTranslation } from 'react-i18next';

import SignForm from '../../../../../../../components/signForm/SignForm';

import style from './Empty.module.scss';

export default function Empty() {
  const { t } = useTranslation();

  return (
    <div className={style.empty}>
      <SignForm>{t('chat.justWrite')}</SignForm>
    </div>
  );
}
