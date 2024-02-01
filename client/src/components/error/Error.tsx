import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading, Paragraph, PrimaryButton } from 'blossom-react-ui';

import style from './Error.module.scss';

export default function Error() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <div className={style.container}>
      <Heading color='red' size='l' weight='bold'>
        {t('etc.errorTitle')}
      </Heading>
      <div className={style.wrapper}>
        <Paragraph size='l' weight='medium' color='primary'>
          {t('etc.errorText')}
        </Paragraph>
        <PrimaryButton onClick={onClick} color='blue'>
          {t('etc.errorButton')}
        </PrimaryButton>
      </div>
    </div>
  );
}
