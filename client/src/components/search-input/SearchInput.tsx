import { useState } from 'react';
import ButtonInput from '../../ui/inputs/button-input/ButtonInput';
import SearchIcon from '../../assets/svg/SearchIcon';
import { useTranslation } from 'react-i18next';

type SearchInputProps = {
  onClick: (value: string) => void;
};

export default function SearchInput({ onClick }: SearchInputProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSearch = () => {
    onClick(value);
  };

  const placeholder = `${t('etc.search')}...`;

  return (
    <ButtonInput
      value={value}
      onChange={onChange}
      onClick={onSearch}
      placeholder={placeholder}
      type='text'
      position='left'
      color='first'
    >
      <SearchIcon />
    </ButtonInput>
  );
}
