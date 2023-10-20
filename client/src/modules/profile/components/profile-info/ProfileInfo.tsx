import Avatar from '../../../../components/avatar/Avatar';
import Heading from '../../../../ui/headings/Heading';
import Paragraph from '../../../../ui/paragraphs/Paragraph';

import style from './ProfileInfo.module.scss';

type ProfileInfoProps = {
  firstName: string;
  lastName: string;
  avatar: string;
  username: string;
};

export default function ProfileInfo({
  firstName,
  lastName,
  avatar,
  username,
}: ProfileInfoProps) {
  return (
    <div className={style.info}>
      <Avatar size='l' firstName={firstName} avatar={avatar} isLink={false} />
      <Heading size='l' color='user'>
        {firstName} {lastName}
      </Heading>
      <Paragraph size='l' color='message'>
        @{username}
      </Paragraph>
    </div>
  );
}
