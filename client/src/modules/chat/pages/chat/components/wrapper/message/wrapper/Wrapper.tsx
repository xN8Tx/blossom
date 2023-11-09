import Body from '../body/Body';
import Info from '../info/Info';

import style from '../Message.module.scss';

type WrapperProps = {
  isDate: boolean;
  isUser: boolean;
  isEdit: boolean;
  status: boolean | 'loading';
  message: string;
};

export default function Wrapper({
  isDate,
  isEdit,
  isUser,
  status,
  message,
}: WrapperProps) {
  return (
    <div className={style.wrapper} is-date={isDate.toString()}>
      <Body message={message} isUser={isUser} status={status} />
      {isEdit && <Info />}
    </div>
  );
}
