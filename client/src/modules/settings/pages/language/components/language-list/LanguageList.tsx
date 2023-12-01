import { useTranslation } from 'react-i18next';

import LanguageItem from '../language-item/LanguageItem';

import languages from '../../assets/languages';

import style from './LanguageList.module.scss';

export default function LanguageList() {
  const { i18n } = useTranslation();

  const activeLanguage = i18n.language;

  return (
    <div className={style.list}>
      {languages.map((language, index) => {
        const isActive = language.language === activeLanguage;

        return (
          <LanguageItem
            name={language.name}
            language={language.language}
            isActive={isActive}
            key={index}
          />
        );
      })}
    </div>
  );
}
