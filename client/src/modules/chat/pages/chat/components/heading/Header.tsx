import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../../store';
import selectById from '../../../../store/chatSelector';

import Avatar from '../../../../../../components/avatar/Avatar';
import Heading from '../../../../../../ui/headings/Heading';
import Paragraph from '../../../../../../ui/paragraphs/Paragraph';

import style from './Header.module.scss';
import SearchIcon from '../../../../assets/SearchIcon';
import BackButton from '../../../../../../components/back-button/BackButton';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  const { id } = useParams();

  const { user } = useAppSelector((state) => selectById(state, Number(id))!);

  const profileUrl = `/user/${user.id}`;
  const name = user.firstName + ' ' + user.lastName;

  return (
    <header className={style.header}>
      <div className={style.container}>
        <BackButton />
        <div className={style.wrapper}>
          <Avatar
            isLink={true}
            to={profileUrl}
            avatar={user.avatar}
            firstName={user.firstName}
            size='m'
          />
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
        </div>
      </div>
      <div className={style.search}>
        <SearchIcon />
      </div>
    </header>
  );
}
