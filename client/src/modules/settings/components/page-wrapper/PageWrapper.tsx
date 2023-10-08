import React from 'react';
import style from './PageWrapper.module.scss';
import { useTranslation } from 'react-i18next';
import BackButton from '../../../../components/back-button/BackButton';
import Heading from '../../../../ui/headings/Heading';
import { useLocation } from 'react-router-dom';

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
        <Heading size='s'>{t(`settingsName.${url}`)}</Heading>
        <div></div>
      </div>
      {children}
    </section>
  );
}
