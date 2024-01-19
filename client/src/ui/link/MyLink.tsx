import { Link } from 'react-router-dom';

import style from './MyLink.module.scss';

type LinkProps = {
  children: React.ReactNode;
  to: string;
};

export default function MyLink({ children, to }: LinkProps) {
  return (
    <Link className={style.link} to={to}>
      {children}
    </Link>
  );
}
