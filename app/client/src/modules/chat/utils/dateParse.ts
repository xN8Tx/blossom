import fromDateToTime from './fromDateToTime';

const dateParse = (date: string) => {
  const parseDate = new Date(date);

  const localeTime = fromDateToTime(date);
  const localeDate = parseDate.toLocaleDateString();
  const localeFullDate = localeDate + '|' + localeTime;

  return {
    localeTime,
    localeDate,
    localeFullDate,
  };
};

export default dateParse;
