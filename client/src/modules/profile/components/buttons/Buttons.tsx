import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectById } from '../../../contact/store/contacts/contactSelector';

import Button from './button/Button';

import MessagesIcon from '../../../../assets/svg/MessagesIcon';
import ContactIcon from '../../../../assets/svg/ContactIcon';

import style from './Buttons.module.scss';
import {
  deleteContact,
  postContact,
} from '../../../contact/store/contacts/contactThunk';
import { Contact } from '../../../../models/data';

export default function Buttons() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { id } = useParams();
  const data = useAppSelector((state) => selectById(state, Number(id)));

  const isContact = (data as Contact[]).length === 0;
  const contactId = (data as Contact[])[0]?.contactId;

  const onMessageClick = () => {};
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
        <Button onClick={onAddClick} image={contactIcon}>
          {t('contact.add')}
        </Button>
      ) : (
        <Button onClick={onDeleteClick} image={contactIcon}>
          {t('contact.delete')}
        </Button>
      )}
    </div>
  );
}
