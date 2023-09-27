import type { ButtonProps } from '../../../models/uiModel';

import style from './SecondaryButton.module.scss';

export default function SecondaryButton({
  onClick,
  children,
  image,
}: ButtonProps) {
  const isImage: boolean = image !== undefined;

  return (
    <button
      className={style.SecondaryButton}
      onClick={onClick}
      contains-image={`${isImage}`}
    >
      {isImage && <img src={image!} alt='Icon' />}
      <span>{children}</span>
    </button>
  );
}
