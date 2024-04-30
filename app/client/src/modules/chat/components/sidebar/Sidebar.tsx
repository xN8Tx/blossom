import SidebarForm from '@/components/sidebar-form/SidebarForm';
import Headings from './heading/Heading';
import ChatList from './chat-list/ChatList';

export default function Sidebar() {
  return (
    <SidebarForm>
      <Headings />
      <ChatList />
    </SidebarForm>
  );
}
