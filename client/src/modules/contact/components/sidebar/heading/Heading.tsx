import { useTranslation } from 'react-i18next';

import SearchInput from '../../../../../components/search-input/SearchInput';

import style from './Heading.module.scss';
import Heading from '../../../../../ui/headings/Heading';
import { useAppDispatch } from '../../../../../store';
import { getUsers } from '../../../store/users/usersThunk';
import { useEffect, useState } from 'react';
import { reset } from '../../../store/users/usersSlice';

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
      <Heading size='l'>{t('title.contacts')}</Heading>
      <SearchInput onClick={onClick} value={value} setValue={setValue} />
    </div>
  );
}
