import Heading from '../../../../../../ui/headings/Heading';
import cameraIcon from '../../assets/cameraIcon.svg';

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

  const onChange = () => {};

  return (
    <div className={style.wrapper}>
      <input type='file' name='fileInp' onChange={onChange} />
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
