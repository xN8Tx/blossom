import React from 'react';

import style from './ButtonsForm.module.scss';

type ButtonsFormProps = {
  children: React.ReactNode;
};

export default function ButtonsForm({ children }: ButtonsFormProps) {
  return <div className={style.buttons}>{children}</div>;
}
