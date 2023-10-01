import Sidebar from './components/sidebar/Sidebar';

import style from './Chat.module.scss';

export default function Chat() {
  return (
    <main className={style.wrapper}>
      <Sidebar />
    </main>
  );
}
