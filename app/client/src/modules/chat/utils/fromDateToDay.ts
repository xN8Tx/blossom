const fromDateToDay = (date: string, t: (str: string) => string) => {
  const messageDate = new Date(date);
  const todayDate = new Date();

  const localeTodayDate = todayDate.toLocaleDateString();
  const localeDate = messageDate.toLocaleDateString();

  if (localeTodayDate === localeDate) {
    /* prettier-ignore */
    return `${t('date.today')}, ${t(`date.${messageDate.getMonth() + 1}Month`)} ${messageDate.getDate()}`;
  }
  /* prettier-ignore */
  return `${t(`date.${messageDate.getDay()}Day`)}, ${t(`date.${messageDate.getMonth() + 1}Month`)} ${messageDate.getDate()}`;
};

export default fromDateToDay;
