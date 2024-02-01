import MessageList from './message-list/MessageList';

import style from './MessagesPreloader.module.scss';

export default function MessagesPreloader() {
  return (
    <div className={style.wrapper} data-id='message-page-preload'>
      <MessageList />
    </div>
  );
}
