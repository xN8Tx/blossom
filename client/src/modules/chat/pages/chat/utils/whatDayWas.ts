import { TFunction } from 'i18next';

const whatDayWas = (_date: string, t: TFunction<'translation', undefined>) => {
  const todayParse = new Date(Date.now());
  const today =
    todayParse.getDate() +
    '-' +
    todayParse.getMonth() +
    '-' +
    todayParse.getFullYear();

  const dateParse = new Date(Number(_date));
  const date =
    dateParse.getDate() +
    '-' +
    dateParse.getMonth() +
    '-' +
    dateParse.getFullYear();

  if (today === date) {
    return `${t('date.today')}, 
    ${t(`date.${dateParse.getMonth()}Month`)} 
    ${dateParse.getDate()}`;
  } else {
    return `${t(`date.${dateParse.getDay()}Day`)}, 
      ${t(`date.${dateParse.getMonth()}Month`)} 
      ${dateParse.getDate()}`;
  }
};

export default whatDayWas;
