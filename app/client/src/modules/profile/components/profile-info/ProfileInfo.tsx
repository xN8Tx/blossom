import { Heading, Paragraph } from 'blossom-react-ui';

import Avatar from '../../../../components/avatar/Avatar';

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
      <Heading size='m' weight='bold' color='primary'>
        {firstName} {lastName}
      </Heading>
      <Paragraph size='l' weight='medium' color='dark'>
        @{username}
      </Paragraph>
    </div>
  );
}
