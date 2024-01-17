import { useState } from 'react';
import { Heading } from 'blossom-react-ui';
import { useTranslation } from 'react-i18next';

import SearchInput from '@/components/search-input/SearchInput';

import style from './Heading.module.scss';

export default function Headings() {
  const { t } = useTranslation();

  const [value, setValue] = useState<string>('');

  const onClick = (value: string) => {
    console.log(value);
  };

  return (
    <div className={style.wrapper}>
      <Heading size='m' weight='bold' color='primary'>
        {t('title.messages')}
      </Heading>
      <SearchInput onClick={onClick} value={value} setValue={setValue} />
    </div>
  );
}
