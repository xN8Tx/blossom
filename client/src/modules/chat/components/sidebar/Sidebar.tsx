import SidebarForm from '../../../../components/sidebar-form/SidebarForm';
import ChatList from './chat-list/ChatList';
import Headings from './heading/Heading';

export default function Sidebar() {
  return (
    <SidebarForm>
      <Headings />
      <ChatList />
    </SidebarForm>
  );
}
