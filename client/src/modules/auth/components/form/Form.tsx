import type { PasswordInputType } from '../../models';

import style from './Form.module.scss';

type FormProps = {
  inputMode?: PasswordInputType;
  children: React.ReactNode;
};

export default function Form({ inputMode = 'text', children }: FormProps) {
  const onFormClick = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={style.form} onClick={onFormClick} inp-mode={inputMode}>
      {children}
    </form>
  );
}
