import { useTranslation } from 'react-i18next';

import SignForm from '@/components/sign-form/SignForm';

export default function SelectSettings() {
  const { t } = useTranslation();

  return <SignForm>{t('homePageText.contactHomePage')}</SignForm>;
}
