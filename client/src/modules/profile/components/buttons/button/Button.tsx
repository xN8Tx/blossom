import type React from 'react';

import style from './Button.module.scss';
import Paragraph from '../../../../../ui/paragraphs/Paragraph';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  image: () => JSX.Element;
};

export default function Button({ onClick, children, image }: ButtonProps) {
  return (
    <button className={style.wrapper} onClick={onClick}>
      {image()}
      <Paragraph size='m' color='user'>
        {children}
      </Paragraph>
    </button>
  );
}
