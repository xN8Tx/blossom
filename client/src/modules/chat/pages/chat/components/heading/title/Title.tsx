import { Heading, Paragraph } from 'blossom-react-ui';
import { useTranslation } from 'react-i18next';

import type { User } from '@/models/data';

import style from './Title.module.scss';

type TitleProps = {
  user: User;
};

export default function Title({ user }: TitleProps) {
  const { t } = useTranslation();

  const name = user.firstName + ' ' + user.lastName;

  return (
    <div className={style.title}>
      <Heading size='m' weight='bold' color='primary'>
        {name}
      </Heading>
      {user.status ? (
        <Paragraph size='l' weight='medium' color='green'>
          {t('status.online')}
        </Paragraph>
      ) : (
        <Paragraph size='l' weight='medium' color='red'>
          {t('status.offline')}
        </Paragraph>
      )}
    </div>
  );
}
