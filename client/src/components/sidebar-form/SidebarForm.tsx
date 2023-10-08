import { useLocation } from 'react-router-dom';
import style from './SidebarForm.module.scss';
import Navbar from './navbar/Navbar';

type SidebarFormProps = {
  children: React.ReactNode;
};

export default function SidebarForm({ children }: SidebarFormProps) {
  const location = useLocation();
  const urlLocation = location.pathname.split('/');

  const isHomePage = urlLocation.length == 2;

  return (
    <div className={style.wrapper} is-home={`${isHomePage}`}>
      <div className={style.container}>{children}</div>
      <Navbar />
    </div>
  );
}
