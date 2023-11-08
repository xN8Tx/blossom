import audioUrl from '../assets/notification.mp3';

const audioNotification = () => {
  const audio = new Audio(audioUrl);
  audio.play();
};

export default audioNotification;
