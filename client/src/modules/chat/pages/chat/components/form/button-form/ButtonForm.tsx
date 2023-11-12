import SendIcon from '../../../../../assets/SendIcon';
import ClipIcon from '../../../../../assets/ClipIcon';

import style from '../Form.module.scss';

type ButtonFormProps = {
  onMyMessageSend: () => void;
};

export default function ButtonForm({ onMyMessageSend }: ButtonFormProps) {
  return (
    <div className={style.buttons}>
      <button className={style.button}>
        <ClipIcon />
      </button>
      <button className={style.button} onClick={onMyMessageSend} type='submit'>
        <SendIcon />
      </button>
    </div>
  );
}
