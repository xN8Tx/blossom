import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from 'blossom-react-ui';

import { useAppDispatch } from '@/store';
import { getUsers } from '@contact/store/users/usersThunk';
import { reset } from '@contact/store/users/usersSlice';

import SearchInput from '@/components/search-input/SearchInput';

import style from './Heading.module.scss';

export default function Headings() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [value, setValue] = useState<string>('');

  const onClick = () => {
    dispatch(getUsers(value));
  };

  useEffect(() => {
    const onEscapeClick = (event: KeyboardEvent) => {
      event.key === 'Escape' && dispatch(reset());
    };
    const onEnterClick = (event: KeyboardEvent) => {
      event.key === 'Enter' && dispatch(getUsers(value));
    };

    document.addEventListener('keydown', onEscapeClick);
    document.addEventListener('keydown', onEnterClick);

    return () => {
      document.removeEventListener('keydown', onEscapeClick);
      document.removeEventListener('keydown', onEnterClick);
    };
  });

  return (
    <div className={style.wrapper}>
      <Heading size='m' weight='bold' color='primary'>
        {t('title.contacts')}
      </Heading>
      <SearchInput onClick={onClick} value={value} setValue={setValue} />
    </div>
  );
}
