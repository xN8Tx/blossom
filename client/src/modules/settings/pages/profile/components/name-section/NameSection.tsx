import { useTranslation } from 'react-i18next';
import { PrimaryInput } from 'blossom-react-ui';

import style from './NameSection.module.scss';

type NameSectionProps = {
  firstNameValue: string;
  lastNameValue: string;
  setFirstNameValue: (value: string) => void;
  setLastNameValue: (value: string) => void;
};

export default function NameSection({
  firstNameValue,
  lastNameValue,
  setFirstNameValue,
  setLastNameValue,
}: NameSectionProps) {
  const { t } = useTranslation();

  type EventType = React.ChangeEvent<HTMLInputElement>;
  const onFirstNameChange = (event: EventType) => {
    setFirstNameValue(event.target.value);
  };
  const onLastNameChange = (event: EventType) => {
    setLastNameValue(event.target.value);
  };

  return (
    <div className={style.wrapper}>
      <PrimaryInput
        type='text'
        placeholder={t('auth.firstName')}
        value={firstNameValue}
        onChange={onFirstNameChange}
      />
      <PrimaryInput
        type='text'
        placeholder={t('auth.lastName')}
        value={lastNameValue}
        onChange={onLastNameChange}
      />
    </div>
  );
}
