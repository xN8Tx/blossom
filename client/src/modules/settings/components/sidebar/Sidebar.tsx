import Headings from './heading/Heading';
import SettingList from './setting-list/SettingList';
import SidebarForm from '@/components/sidebar-form/SidebarForm';

export default function Sidebar() {
  return (
    <SidebarForm>
      <Headings />
      <SettingList />
    </SidebarForm>
  );
}
