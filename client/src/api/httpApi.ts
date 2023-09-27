import axios from 'axios';
import config from '../config';
// import store from '../store';
// import { resetUser } from '../store/auth/authSlice';

const $http = axios.create({
  withCredentials: true,
  baseURL: config.serverURL,
});

$http.interceptors.request.use((config) => {
  config.headers.Authorization =
    'Bearer ' + localStorage.getItem('accessToken');
  return config;
});

$http.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originRequest = error.config;

    if (error.request.status === 401 || originRequest.isRetry === true) {
      originRequest.isRetry = true;
      try {
        const response = await axios.get(config.serverURL + '/auth/refresh', {
          withCredentials: true,
        });
        localStorage.setItem('accessToken', response.data.message);
        return $http.request(originRequest);
      } catch (error) {
        // localStorage.removeItem('accessToken');
        // store.dispatch(resetUser());
      }
    }
    throw new Error();
  }
);

export default $http;
