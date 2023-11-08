/* eslint-disable @typescript-eslint/no-unused-vars */
const timeHandler = (date: string) => {
  const parseDate = new Date(Number(date));

  let min: string;
  let hour: string;
  const minutes = parseDate.getMinutes();
  const hours = parseDate.getHours();

  if (Number(minutes) < 10) {
    min = 0 + minutes.toString();
  } else {
    min = minutes.toString();
  }

  if (Number(hours) < 10) {
    hour = 0 + hours.toString();
  } else {
    hour = hours.toString();
  }

  return `${hour}:${min}`;
};

export default timeHandler;
