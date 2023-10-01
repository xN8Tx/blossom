import { useTranslation } from 'react-i18next';

import SignForm from '../../../../components/signForm/SignForm';

import style from './InDevelopment.module.scss';

export default function InDevelopment() {
  const { t } = useTranslation();

  return (
    <div className={style.wrapper}>
      <SignForm>{t('etc.inDevelopment')}</SignForm>;
    </div>
  );
}
