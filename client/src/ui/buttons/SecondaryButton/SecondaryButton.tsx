import type { ButtonProps } from '../../../models/uiProps';

import style from './SecondaryButton.module.scss';

export default function SecondaryButton({
  onClick,
  children,
  image,
}: ButtonProps) {
  const isImage: boolean = image !== undefined;
  const isImageString = typeof image === 'string';

  return (
    <button
      className={style.SecondaryButton}
      onClick={onClick}
      contains-image={`${isImage}`}
    >
      {isImage && (isImageString ? <img src={image} alt='Icon' /> : image!())}
      <span>{children}</span>
    </button>
  );
}
