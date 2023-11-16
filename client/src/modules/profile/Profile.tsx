import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';
import { getProfile } from './store/profileThunk';
import { reset } from './store/profileSlice';

import BackButton from '../../components/back-button/BackButton';
import ProfileInfo from './components/profile-info/ProfileInfo';
import Buttons from './components/buttons/Buttons';
import Error from './components/error/Error';

import type { Profile } from '../../models/data';

import style from './Profile.module.scss';

export default function Profile() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const data = useAppSelector((state) => state.profile.data);
  const loading = useAppSelector((state) => state.profile.loading);
  const userLoading = useAppSelector((state) => state.user.loading);
  const contactLoading = useAppSelector((state) => state.contacts.loading);

  const isLoading =
    userLoading === 'success' &&
    contactLoading === 'success' &&
    loading === 'success';

  useEffect(() => {
    if (userLoading === 'success' && contactLoading === 'success') {
      dispatch(getProfile(Number(id!)));
    }

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoading, contactLoading, id]);

  return (
    <div className={style.wrapper}>
      <div className={style.btn}>
        <BackButton />
      </div>
      {isLoading && (
        <>
          <ProfileInfo
            firstName={data!.firstName}
            lastName={data!.lastName}
            username={data!.username}
            avatar={data!.avatar}
          />
          <Buttons />
        </>
      )}
      {loading == 'error' && <Error />}
    </div>
  );
}
