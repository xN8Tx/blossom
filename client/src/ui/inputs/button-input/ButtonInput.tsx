import type { BtnInputProps } from '../../../models/uiModel';

import style from './ButtonInput.module.scss';

export default function ButtonInput({
  children,
  onClick,
  onChange,
  placeholder,
  value,
  type,
  position,
  color,
}: BtnInputProps) {
  return (
    <div className={style.container} data-pos={position} data-color={color}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={style.input}
      />
      <p onClick={onClick} className={style.btn} tabIndex={-1}>
        {children}
      </p>
    </div>
  );
}
