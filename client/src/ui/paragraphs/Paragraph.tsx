import type { ParagraphProps } from '../../models/uiProps';

import style from './Paragraph.module.scss';

export default function Paragraph({
  children,
  color = 'message',
  size = 's',
}: ParagraphProps) {
  const className = `${style.Paragraph} ${style[color]} ${style[size]}`;

  return <p className={className}>{children}</p>;
}
