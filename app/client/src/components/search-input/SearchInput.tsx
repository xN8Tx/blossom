import { useTranslation } from 'react-i18next';
import { ButtonInput } from 'blossom-react-ui';

import SearchIcon from '@/assets/svg/SearchIcon';

type SearchInputProps = {
  onClick: (value: string) => void;
  value: string;
  setValue: (value: string) => void;
};

export default function SearchInput({
  onClick,
  value,
  setValue,
}: SearchInputProps) {
  const { t } = useTranslation();

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
      color='primary'
    >
      <SearchIcon />
    </ButtonInput>
  );
}
