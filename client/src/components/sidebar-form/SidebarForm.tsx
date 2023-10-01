import style from './SidebarForm.module.scss';
import Navbar from './navbar/Navbar';

type SidebarFormProps = {
  children: React.ReactNode;
};

export default function SidebarForm({ children }: SidebarFormProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>{children}</div>
      <Navbar />
    </div>
  );
}
