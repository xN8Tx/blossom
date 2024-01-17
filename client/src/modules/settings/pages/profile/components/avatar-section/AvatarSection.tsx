import { useTranslation } from 'react-i18next';
import { Heading, useModal } from 'blossom-react-ui';

import { useAppDispatch } from '@/store';
import { editAvatar } from '@/store/user/userThunk';

import cameraIcon from '../../assets/cameraIcon.svg';

import type { ChangeEvent } from 'react';

import style from './AvatarSection.module.scss';

type AvatarSectionProps = {
  avatar: string | null;
  firstName: string;
};

export default function AvatarSection({
  avatar,
  firstName,
}: AvatarSectionProps) {
  const urlToAvatar = typeof avatar === 'string' && avatar;
  const firstLetter = firstName[0].toUpperCase();

  const dispatch = useAppDispatch();
  const modal = useModal();
  const { t } = useTranslation();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const fileSize = file.size / Math.pow(10, 6);
    const isFileBigger = import.meta.env.VITE_MAX_FILE_SIZE < fileSize;

    const readerAvatar = new FileReader();
    readerAvatar.addEventListener('load', () => {
      dispatch(editAvatar(readerAvatar.result!.toString()));
    });

    if (isFileBigger) modal('error', t('chat.fileBigger'), 2000);
    if (!isFileBigger) readerAvatar.readAsDataURL(file);
  };

  return (
    <div className={style.wrapper}>
      <input type='file' name='fileInp' onChange={onChange} accept='image/*' />
      <label htmlFor='fileInp'>
        <img src={cameraIcon} alt='Camera icon' />
      </label>
      <div className={style.avatarContainer}>
        {urlToAvatar && <img src={urlToAvatar} alt='Avatar' />}
        {!urlToAvatar && (
          <Heading size='m' weight='bold' color='primary'>
            {firstLetter}
          </Heading>
        )}
      </div>
    </div>
  );
}
