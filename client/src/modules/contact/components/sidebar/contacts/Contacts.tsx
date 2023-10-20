import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../store';

import Heading from '../../../../../ui/headings/Heading';
import UserItem from '../user-item/UserItem';

import style from './Contacts.module.scss';

export default function Contacts() {
  const { t } = useTranslation();

  const { data, loading } = useAppSelector((state) => state.contacts);

  return (
    <div className={style.wrapper}>
      <Heading size='s' color='user'>
        {t('title.contacts')}
      </Heading>
      <div className={style.container}>
        {loading === 'success' &&
          data!.map((contact) => (
            <UserItem
              id={contact.contactId}
              firstName={contact.firstName}
              lastName={contact.lastName}
              avatar={contact.avatar}
              username={contact.username}
              key={contact.id}
            />
          ))}
      </div>
    </div>
  );
}
