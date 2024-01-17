import { PrimaryButton } from 'blossom-react-ui';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/store';
import { logout } from '@/store/auth/authThunk';

import style from './ButtonSection.module.scss';

type ButtonSectionProps = {
  onEditClick: () => void;
};

export default function ButtonSection({ onEditClick }: ButtonSectionProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onLogOutClick = async () => {
    await dispatch(logout());
    window.location.href = import.meta.env.VITE_FRONTEND_SERVER_URL;
  };

  return (
    <div className={style.wrapper}>
      <PrimaryButton onClick={onEditClick} color='blue'>
        {t('profile.edit')}
      </PrimaryButton>
      <PrimaryButton onClick={onLogOutClick} color='red'>
        {t('profile.logOut')}
      </PrimaryButton>
    </div>
  );
}
