import Appearance from '../modules/settings/pages/appearance/Appearance';
import Devices from '../modules/settings/pages/devices/Devices';
import General from '../modules/settings/pages/general/General';
import Home from '../modules/settings/pages/home/Home';
import Language from '../modules/settings/pages/language/Language';
import Privacy from '../modules/settings/pages/privacy/Privacy';
import Profile from '../modules/settings/pages/profile/Profile';

import appearanceIcon from '../assets/svg/setting-page-icons/appearanceIcon.svg';
import devicesIcon from '../assets/svg/setting-page-icons/devicesIcon.svg';
import generalIcon from '../assets/svg/setting-page-icons/generalIcon.svg';
import languageIcon from '../assets/svg/setting-page-icons/languageIcon.svg';
import privacyIcon from '../assets/svg/setting-page-icons/privacyIcon.svg';

const settingRoutes = [
  { name: 'home', path: 'index', element: <Home />, isShow: false },
  { name: 'profile', path: 'profile', element: <Profile />, isShow: false },
  {
    name: 'general',
    path: 'general',
    element: <General />,
    isShow: true,
    icon: generalIcon,
  },
  {
    name: 'privacy',
    path: 'privacy',
    element: <Privacy />,
    isShow: true,
    icon: privacyIcon,
  },
  {
    name: 'devices',
    path: 'devices',
    element: <Devices />,
    isShow: true,
    icon: devicesIcon,
  },
  {
    name: 'appearance',
    path: 'appearance',
    element: <Appearance />,
    isShow: true,
    icon: appearanceIcon,
  },
  {
    name: 'language',
    path: 'language',
    element: <Language />,
    isShow: true,
    icon: languageIcon,
  },
];

export default settingRoutes;
