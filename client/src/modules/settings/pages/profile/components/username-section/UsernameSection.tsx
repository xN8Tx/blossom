import { useTranslation } from 'react-i18next';

import Paragraph from '@/ui/paragraphs/Paragraph';
import MainInput from '@/ui/inputs/main-input/MainInput';

import style from './UsernameSection.module.scss';

type UsernameSectionProps = {
  usernameValue: string;
  setUsernameValue: (value: string) => void;
};

export default function UsernameSection({
  usernameValue,
  setUsernameValue,
}: UsernameSectionProps) {
  const { t } = useTranslation();

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(event.target.value);
  };

  return (
    <div className={style.wrapper}>
      <Paragraph size='s' color='message'>
        {t('auth.username')}
      </Paragraph>
      <MainInput
        placeholder={t('auth.username')}
        type='text'
        value={usernameValue}
        onChange={onUsernameChange}
      />
    </div>
  );
}
