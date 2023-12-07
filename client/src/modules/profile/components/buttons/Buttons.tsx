import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store';
import { selectById } from '@contact/store/contacts/contactSelector';
import selectByCompanionId from '@chat/store/selectors/selectByCompanionId';
import { createChat } from '@chat/store/chatThunk';
import {
  deleteContact,
  postContact,
} from '@contact/store/contacts/contactThunk';

import Button from './button/Button';

import MessagesIcon from '@/assets/svg/MessagesIcon';
import ContactIcon from '@/assets/svg/ContactIcon';

import type { Contact } from '@/models/data';

import style from './Buttons.module.scss';

export default function Buttons() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { id } = useParams();
  const data = useAppSelector((state) => selectById(state, Number(id)));
  const chat = useAppSelector((state) => selectByCompanionId(state, id!));

  const isContact = (data as Contact) !== undefined;

  const contactId = (data as Contact)?.contactId;

  const onMessageClick = async () => {
    if (chat !== undefined) {
      navigate('/chat/' + chat.id);
    } else {
      await dispatch(createChat(id!));
      navigate('/chat/');
    }
  };

  const onAddClick = () => {
    dispatch(postContact(Number(id)));
  };
  const onDeleteClick = () => {
    dispatch(deleteContact(contactId));
  };

  const messageIcon = () => <MessagesIcon />;
  const contactIcon = () => <ContactIcon />;

  return (
    <div className={style.wrapper}>
      <Button onClick={onMessageClick} image={messageIcon}>
        {t('contact.message')}
      </Button>
      {isContact ? (
        <Button onClick={onDeleteClick} image={contactIcon}>
          {t('contact.delete')}
        </Button>
      ) : (
        <Button onClick={onAddClick} image={contactIcon}>
          {t('contact.add')}
        </Button>
      )}
    </div>
  );
}
