import { useAppSelector } from '@/store';

import SidebarForm from '@/components/sidebar-form/SidebarForm';
import Contacts from './contacts/Contacts';
import Headings from './heading/Heading';
import Users from './users/Users';

export default function Sidebar() {
  const loading = useAppSelector((state) => state.users.loading);

  return (
    <SidebarForm>
      <Headings />
      {loading === 'success' ? <Users /> : <Contacts />}
    </SidebarForm>
  );
}
