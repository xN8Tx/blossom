import { Link } from 'react-router-dom';

import type { LinkProps } from '../../models/uiModel';

import style from './MyLink.module.scss';

export default function MyLink({ children, to }: LinkProps) {
  return (
    <Link className={style.link} to={to}>
      {children}
    </Link>
  );
}
