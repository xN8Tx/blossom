import settingRoutes from '../../../../../routes/SettingsRoutes';
import SettingItem from '../setting-item/SettingItem';

import style from './SettingList.module.scss';

export default function SettingList() {
  return (
    <div className={style.list}>
      {settingRoutes.map((route, index) => {
        if (!route.isShow) return;

        const to = `/settings/${route.path}`;

        return (
          <SettingItem
            title={route.name}
            to={to}
            image={route.icon!}
            key={index}
          />
        );
      })}
    </div>
  );
}
