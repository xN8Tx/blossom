import { ChangeEvent } from 'react';
import Heading from '../../../../../../ui/headings/Heading';
import cameraIcon from '../../assets/cameraIcon.svg';

import style from './AvatarSection.module.scss';
import config from '../../../../../../config';
import { useAppDispatch } from '../../../../../../store';
import { editAvatar } from '../../../../../../store/user/userThunk';
import useModal from '../../../../../modal/hooks/useModal';
import { useTranslation } from 'react-i18next';

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
    const isFileBigger = config.maxFileSize < fileSize;

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
        {!urlToAvatar && <Heading size='l'>{firstLetter}</Heading>}
      </div>
    </div>
  );
}
