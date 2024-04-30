import type React from 'react';
import { Paragraph } from 'blossom-react-ui';

import style from './Button.module.scss';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  image: () => JSX.Element;
};

export default function Button({ onClick, children, image }: ButtonProps) {
  return (
    <button className={style.wrapper} onClick={onClick}>
      {image()}
      <Paragraph size='l' weight='regular' color='primary'>
        {children}
      </Paragraph>
    </button>
  );
}
