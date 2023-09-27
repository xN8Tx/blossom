import type { ButtonProps } from '../../../models/uiProps';

import style from './PrimaryButton.module.scss';

export default function PrimaryButton({
  children,
  onClick,
  color = 'blue',
}: ButtonProps) {
  const className = style.PrimaryButton + ' ' + style[color];

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
