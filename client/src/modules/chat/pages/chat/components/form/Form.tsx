import InputForm from './input-form/InputForm';
import ChangeMessage from './change-message/ChangeMessage';

import style from './Form.module.scss';

export default function Form() {
  return (
    <div className={style.container}>
      <ChangeMessage />
      <div className={style.wrapper}>
        <InputForm />
      </div>
    </div>
  );
}
