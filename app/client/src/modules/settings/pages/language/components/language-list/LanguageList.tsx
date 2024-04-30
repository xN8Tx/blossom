import { useTranslation } from 'react-i18next';

import SettingButton from '@settings/components/setting-button/SettingButton';
import languages from '../../assets/languages';

import style from '@settings/Settings.module.scss';

export default function LanguageList() {
  const { i18n } = useTranslation();

  const activeLanguage = i18n.language;

  const changeLanguage = (language: string, isActive: boolean) =>
    !isActive && i18n.changeLanguage(language);

  return (
    <div className={style.list}>
      {languages.map((language, index) => {
        const isActive = language.language === activeLanguage;

        return (
          <SettingButton
            name={language.name}
            onClick={() => changeLanguage(language.language, isActive)}
            isActive={isActive}
            key={index}
          />
        );
      })}
    </div>
  );
}
