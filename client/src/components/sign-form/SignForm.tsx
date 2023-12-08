import Paragraph from '@/ui/paragraphs/Paragraph';

import style from './SignForm.module.scss';

type SignFormProps = {
  children: React.ReactNode;
};

export default function SignForm({ children }: SignFormProps) {
  return (
    <div className={style.wrapper}>
      <Paragraph size='m' color='message'>
        {children}
      </Paragraph>
    </div>
  );
}
