import { useTranslation } from 'react-i18next';

import Heading from '@/ui/headings/Heading';

import selected from '../../assets/selected.png';

import style from './LanguageItem.module.scss';

type LanguageItemProps = {
  name: string;
  language: string;
  isActive: boolean;
};

export default function LanguageItem({
  name,
  language,
  isActive,
}: LanguageItemProps) {
  const { i18n } = useTranslation();

  const onClick = () => !isActive && i18n.changeLanguage(language);

  return (
    <button
      className={style.wrapper}
      is-active={`${isActive}`}
      onClick={onClick}
    >
      <Heading size='s'>{name}</Heading>
      {isActive && <img src={selected} alt='Selected icon' />}
    </button>
  );
}
