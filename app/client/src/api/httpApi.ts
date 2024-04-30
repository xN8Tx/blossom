import axios, { InternalAxiosRequestConfig } from 'axios';
import store from '../store';

import { resetUser } from '@/store/user/userSlice';
import { resetAuth } from '@/store/auth/authSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestConfig = (config: InternalAxiosRequestConfig<any>) => {
  config.headers.Authorization =
    'Bearer ' + localStorage.getItem('accessToken');
  return config;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseConfig = async (error: any) => {
  const originRequest = error.config;

  if (error.request.status === 401 || originRequest.isRetry === true) {
    originRequest.isRetry = true;
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + '/auth/refresh',
        {
          withCredentials: true,
        }
      );
      localStorage.setItem('accessToken', response.data.message);
      return $http.request(originRequest);
    } catch (error) {
      localStorage.removeItem('accessToken');
      store.dispatch(resetUser());
      store.dispatch(resetAuth());
    }
  }
  throw new Error();
};

console.log(import.meta.env.VITE_SERVER_URL);

const $http = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_SERVER_URL,
});
$http.interceptors.request.use(requestConfig);
$http.interceptors.response.use((config) => config, responseConfig);

const $fileHttp = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_FILE_SERVER_URL,
});
$fileHttp.interceptors.request.use(requestConfig);
$fileHttp.interceptors.response.use((config) => config, responseConfig);

export default $http;
export { $fileHttp };
