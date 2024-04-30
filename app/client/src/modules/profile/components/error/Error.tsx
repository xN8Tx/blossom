import { useTranslation } from 'react-i18next';
import SignForm from '../../../../components/sign-form/SignForm';
import style from './Error.module.scss';

export default function Error() {
  const { t } = useTranslation();

  return (
    <div className={style.wrapper}>
      <SignForm>{t('users.error')}</SignForm>
    </div>
  );
}
