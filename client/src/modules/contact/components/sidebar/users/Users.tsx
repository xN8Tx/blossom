import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../../store';

import { reset } from '@contact/store/users/usersSlice';
import { selectWithoutUser } from '@contact/store/users/usersSelector';

import Paragraph from '@/ui/paragraphs/Paragraph';
import Heading from '@/ui/headings/Heading';
import UserItem from '../user-item/UserItem';

import style from './Users.module.scss';

export default function Users() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const data = useAppSelector((state) => selectWithoutUser(state));
  const loading = useAppSelector((state) => state.users.loading);

  const onClick = () => dispatch(reset());

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <Heading size='s' color='user'>
          {t('contact.globalSearch')}
        </Heading>
        <Paragraph size='s' color='message' onClick={onClick}>
          {t('etc.close').toLowerCase()}
        </Paragraph>
      </div>
      <div className={style.container}>
        {loading === 'success' &&
          data!.map((contact) => (
            <UserItem
              id={contact.id}
              firstName={contact.firstName}
              lastName={contact.lastName}
              avatar={contact.avatar}
              username={contact.username}
              status={contact.status}
              key={contact.id}
            />
          ))}
      </div>
    </div>
  );
}
