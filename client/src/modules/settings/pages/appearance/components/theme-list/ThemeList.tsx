import { ThemeType, useTheme } from 'blossom-react-ui';
import { useTranslation } from 'react-i18next';

import SettingButton from '@settings/components/setting-button/SettingButton';
import languages from '../../assets/languages';

import style from '@settings/Settings.module.scss';

export default function ThemeList() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={style.list}>
      {languages.map((language, index) => {
        const isActive = language.name === theme;

        return (
          <SettingButton
            name={t(`theme.${language.name}`)}
            onClick={() => setTheme(language.name as ThemeType)}
            isActive={isActive}
            key={index}
          />
        );
      })}
    </div>
  );
}
