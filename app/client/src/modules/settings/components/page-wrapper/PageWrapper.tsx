import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading } from 'blossom-react-ui';

import BackButton from '@/components/back-button/BackButton';

import style from './PageWrapper.module.scss';

type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const url = location.pathname.split('/').pop();

  return (
    <section className={style.wrapper}>
      <div className={style.heading}>
        <BackButton />
        <Heading size='xs' weight='bold' color='primary'>
          {t(`settingsName.${url}`)}
        </Heading>
        <div></div>
      </div>
      {children}
    </section>
  );
}
