import { NavLink } from 'react-router-dom';

import Heading from '../../../../../ui/headings/Heading';

import type { ClassNameType } from '../../../../../models';

import linkIcon from '../../../assets/linkIcon.svg';

import style from './SettingItem.module.scss';
import { useTranslation } from 'react-i18next';

type SettingItemProps = {
  image: string;
  title: string;
  to: string;
};

export default function SettingItem({ image, title, to }: SettingItemProps) {
  const { t } = useTranslation();

  const className = ({ isActive }: ClassNameType) =>
    isActive ? `${style.link} ${style.active}` : style.link;

  const name = t(`settingsName.${title}`);

  return (
    <NavLink to={to} className={className}>
      <div className={style.title}>
        <img src={image} alt='Icon' />
        <Heading size='s'>{name}</Heading>
      </div>
      <img src={linkIcon} alt='Next icon' className={style.icon} />
    </NavLink>
  );
}
