import PageWrapper from '../../components/page-wrapper/PageWrapper';
import Form from './components/form/Form';

import style from './Profile.module.scss';

export default function Profile() {
  return (
    <PageWrapper>
      <div className={style.wrapper}>
        <Form />
      </div>
    </PageWrapper>
  );
}
