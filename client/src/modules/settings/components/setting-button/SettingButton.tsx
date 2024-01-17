import { Heading } from 'blossom-react-ui';

import selected from '@settings/assets/selected.png';

import style from './SettingButton.module.scss';

type LanguageItemProps = {
  name: string;
  onClick: () => void;
  isActive: boolean;
};

export default function SettingButton({
  name,
  onClick,
  isActive,
}: LanguageItemProps) {
  return (
    <button
      className={style.wrapper}
      is-active={`${isActive}`}
      onClick={onClick}
    >
      <Heading size='xs' weight='bold' color='primary'>
        {name}
      </Heading>
      {isActive && <img src={selected} alt='Selected icon' />}
    </button>
  );
}
