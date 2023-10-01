import { useTranslation } from 'react-i18next';

import SearchInput from '../../../../../components/search-input/SearchInput';

import style from './Heading.module.scss';
import Heading from '../../../../../ui/headings/Heading';

export default function Headings() {
  const { t } = useTranslation();

  const onClick = (value: string) => {
    console.log(value);
  };

  return (
    <div className={style.wrapper}>
      <Heading size='l'>{t('title.messages')}</Heading>
      <SearchInput onClick={onClick} />
    </div>
  );
}
