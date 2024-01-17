import { Paragraph, PrimaryInput } from 'blossom-react-ui';
import { useTranslation } from 'react-i18next';

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
      <Paragraph size='m' weight='medium' color='dark'>
        {t('auth.username')}
      </Paragraph>
      <PrimaryInput
        placeholder={t('auth.username')}
        type='text'
        value={usernameValue}
        onChange={onUsernameChange}
      />
    </div>
  );
}
