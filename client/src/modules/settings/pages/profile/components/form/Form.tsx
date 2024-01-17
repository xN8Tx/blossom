import { useState } from 'react';
import { useModal } from 'blossom-react-ui';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store';
import { editUser } from '@/store/user/userThunk';

import NameSection from '../name-section/NameSection';
import UsernameSection from '../username-section/UsernameSection';
import AvatarSection from '../avatar-section/AvatarSection';
import ButtonSection from '../button-section/ButtonSection';

import style from './Form.module.scss';

export default function Form() {
  const dispatch = useAppDispatch();
  const modal = useModal();
  const { t } = useTranslation();

  const { id, firstName, lastName, username, avatar } = useAppSelector(
    (state) => state.user.data
  );
  const isEditLoaded = useAppSelector((state) => state.user.isEditLoaded);

  const [firstNameValue, setFirstNameValue] = useState<string>(firstName!);
  const [lastNameValue, setLastNameValue] = useState<string>(lastName!);
  const [usernameValue, setUsernameValue] = useState<string>(username!);

  const onEditClick = () => {
    const myModal = () => modal('error', t('auth.allField'));

    if (firstNameValue.length <= 5) return myModal();
    if (lastNameValue.length <= 5) return myModal();
    if (usernameValue.length <= 5) return myModal();
    if (isEditLoaded === 'loading') return 0;

    const title = {
      id,
      firstName: firstNameValue,
      lastName: lastNameValue,
      username: usernameValue,
    };

    dispatch(editUser(title));
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <AvatarSection avatar={avatar} firstName={firstName!} />
        <NameSection
          firstNameValue={firstNameValue}
          lastNameValue={lastNameValue}
          setFirstNameValue={setFirstNameValue}
          setLastNameValue={setLastNameValue}
        />
      </div>
      <UsernameSection
        usernameValue={usernameValue}
        setUsernameValue={setUsernameValue}
      />
      <ButtonSection onEditClick={onEditClick} />
    </div>
  );
}
