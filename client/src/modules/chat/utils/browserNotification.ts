import config from '../../../config';

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
        url: `${config.siteIp}/chat/c/${chatId}`,
      },
      icon: icon,
      silent: true,
    });
  }
};

export default browserNotification;
