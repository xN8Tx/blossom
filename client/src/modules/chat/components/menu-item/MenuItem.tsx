import { useTranslation } from 'react-i18next';

import style from './MenuItem.module.scss';
import Paragraph from '../../../../ui/paragraphs/Paragraph';

type MenuItemProps = {
  name: string;
  icon: () => JSX.Element;
  onClick: (value?: unknown) => void;
  color: 'user' | 'red';
};

export default function MenuItem({
  name,
  icon,
  onClick,
  color,
}: MenuItemProps) {
  const { t } = useTranslation();
  const Icon = icon();

  const className = style.icon + ' ' + style[color];

  return (
    <div className={style.item} onClick={onClick}>
      <div className={className}>{Icon}</div>
      <Paragraph size='l' color={color}>
        {t(`menu.${name}`)}
      </Paragraph>
    </div>
  );
}
