import { useTranslation } from 'react-i18next';
import SignForm from '../../../../../../components/signForm/SignForm';

export default function SelectSettings() {
  const { t } = useTranslation();

  return <SignForm>{t('homePageText.contactHomePage')}</SignForm>;
}
