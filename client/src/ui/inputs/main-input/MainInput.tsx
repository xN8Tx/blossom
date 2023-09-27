import type { InputProps } from '../../../models/uiModel';

import style from './MainInput.module.scss';

export default function MainInput({
  placeholder,
  type,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      className={style.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
