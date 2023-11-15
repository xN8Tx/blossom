import style from './MenuButton.module.scss';

type MenuButtonProps = {
  onClick: () => void;
};

export default function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <button className={style.button} onClick={onClick}>
      <span></span>
    </button>
  );
}
