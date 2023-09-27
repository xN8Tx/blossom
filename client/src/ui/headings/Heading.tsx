import type { HeadingsProps } from '../../models/uiModel';

import style from './Heading.module.scss';

export default function Heading({
  children,
  color = 'user',
  size,
}: HeadingsProps) {
  const className = `${style.Heading} ${style[color]} ${style[size]}`;

  return <h1 className={className}>{children}</h1>;
}
