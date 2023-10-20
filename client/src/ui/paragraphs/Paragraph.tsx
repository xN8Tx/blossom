import type { ParagraphProps } from '../../models/uiProps';

import style from './Paragraph.module.scss';

export default function Paragraph({
  children,
  color = 'message',
  size = 's',
  onClick,
}: ParagraphProps) {
  const className = `${style.Paragraph} ${style[color]} ${style[size]}`;

  return (
    <p className={className} onClick={onClick}>
      {children}
    </p>
  );
}
