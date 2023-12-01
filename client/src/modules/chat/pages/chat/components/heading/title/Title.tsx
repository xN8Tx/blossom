import { useTranslation } from 'react-i18next';

import Heading from '@/ui/headings/Heading';
import Paragraph from '@/ui/paragraphs/Paragraph';

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
      <Heading size='l' color='user'>
        {name}
      </Heading>
      {user.status ? (
        <Paragraph size='l' color='green'>
          {t('status.online')}
        </Paragraph>
      ) : (
        <Paragraph size='l' color='red'>
          {t('status.offline')}
        </Paragraph>
      )}
    </div>
  );
}
