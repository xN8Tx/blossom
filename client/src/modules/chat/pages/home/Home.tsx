import SelectSettings from './components/select-settings/SelectSettings';

import style from './Home.module.scss';

export default function Home() {
  return (
    <div className={style.wrapper}>
      <SelectSettings />
    </div>
  );
}
