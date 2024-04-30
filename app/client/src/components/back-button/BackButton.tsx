import { useTranslation } from 'react-i18next';
import { SecondaryButton } from 'blossom-react-ui';
import { useNavigate } from 'react-router-dom';

import BackIcon from '@/assets/svg/BackIcon';

export default function BackButton() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const onClick = () => navigate(-1);

  const image = () => <BackIcon />;

  return (
    <SecondaryButton onClick={onClick} image={image}>
      {t('profile.back')}
    </SecondaryButton>
  );
}
