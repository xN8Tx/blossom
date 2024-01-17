import { useTranslation } from 'react-i18next';

import style from './MenuItem.module.scss';
import { Paragraph } from 'blossom-react-ui';

type MenuItemProps = {
  name: string;
  icon: () => JSX.Element;
  onClick: (value?: unknown) => void;
  color: 'primary' | 'red';
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
      <Paragraph size='l' weight='medium' color={color}>
        {t(`menu.${name}`)}
      </Paragraph>
    </div>
  );
}
