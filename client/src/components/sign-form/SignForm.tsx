import { Paragraph } from 'blossom-react-ui';
import style from './SignForm.module.scss';

type SignFormProps = {
  children: React.ReactNode;
};

export default function SignForm({ children }: SignFormProps) {
  return (
    <div className={style.wrapper}>
      <Paragraph size='l' weight='regular' color='dark'>
        {children}
      </Paragraph>
    </div>
  );
}
