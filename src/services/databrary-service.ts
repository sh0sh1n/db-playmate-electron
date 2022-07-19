import axios from 'axios';
import { session } from 'electron';
import volumeData from './volume899.json';

const BASE_API_URL = 'https://nyu.databrary.org/api';
const BASE_URL = 'https://nyu.databrary.org/';
let csverf: string;
let cookie: string;
// eslint-disable-next-line prefer-const
let axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    Cache: 'no-cache',
  },
});

// axiosInstance.defaults.xsrfHeaderName = 'x-csverf';

const login = async (email: string, password: string, superuser = false) => {
  const response = await axiosInstance.post('/user/login', {
    email,
    password,
    superuser,
  });

  // csverf = response.data.csverf;
  console.log('Response headers', response.headers);
  // eslint-disable-next-line prefer-destructuring
  cookie = (response.headers['set-cookie'] || [])[0].split('; ')[0];
  session.defaultSession.cookies.set(cookie);

  // console.log('Axios instance', axiosInstance);

  axiosInstance.interceptors.request.use((config) => {
    if (config && config.headers) {
      config.headers['x-csverf'] = csverf;
    }
    return config;
  });

  // return response;
};

const getVolumeInfo = async (volumeId: string): Promise<unknown> => {
  // const params = {
  //   access: '',
  //   citation: '',
  //   links: '',
  //   funding: '',
  //   top: '',
  //   tags: '',
  //   excerpts: '',
  //   comments: '',
  //   records: '',
  //   containers: 'all',
  //   metrics: '',
  //   state: '',
  // };
  // console.log('Get Volume session', session);
  // axiosInstance.defaults.headers.common.Cookie = session;
  // console.log('Axios instance for getVolume', axiosInstance.defaults);
  // const response = await axiosInstance.get(`/volume/${volumeId}`, {
  //   params: { ...params },
  // });
  // return response.data;
  return volumeData;
};

export { login, getVolumeInfo };
