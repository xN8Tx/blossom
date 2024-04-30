const fromDateToTime = (date: string) => {
  const messageDate = new Date(date);

  const messageTime = messageDate.toLocaleTimeString();

  const hours = messageTime.split(':').shift();
  const minutes = messageTime.split(':').splice(1, 1);
  const lastElementOfTime = messageTime.split(' ').pop();
  const meridiem =
    lastElementOfTime === ' AM' || lastElementOfTime === ' PM'
      ? lastElementOfTime
      : '';

  const messageTimeEdited = `${hours}:${minutes}${meridiem}`;

  return messageTimeEdited;
};

export default fromDateToTime;
