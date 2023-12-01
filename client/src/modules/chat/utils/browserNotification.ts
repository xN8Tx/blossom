import icon from '../../../assets/images/logo.ico';

const browserNotification = async (
  name: string,
  message: string,
  chatId: number
) => {
  const permissions = await Notification.requestPermission();

  if (permissions === 'granted') {
    new Notification(name, {
      body: message,
      data: {
        url: `${import.meta.env.VITE_FRONTEND_SERVER_URL}/chat/c/${chatId}`,
      },
      icon: icon,
      silent: true,
    });
  }
};

export default browserNotification;
