import style from './MessageItem.module.scss';

type MessagePropsType = {
  isUser: boolean;
};

export default function Message({ isUser }: MessagePropsType) {
  return <div is-user={isUser.toString()} className={style.message}></div>;
}
