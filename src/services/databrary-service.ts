import axios from 'axios';
import { parse as parseSetCookie } from 'set-cookie-parser';
import { session } from 'electron';
import volumeData from './volume899.json';
import envVariables from '../../env.json';

const { DATABRARY_API_URL, DATABRARY_EMAIL, DATABRARY_PASSWORD } = envVariables;
let csverf: string;
let cookie: string;
// eslint-disable-next-line prefer-const
let axiosInstance = axios.create({
  baseURL: DATABRARY_API_URL,
  withCredentials: true,
  headers: {
    Cache: 'no-cache',
  },
});

// axiosInstance.defaults.xsrfHeaderName = 'x-csverf';

const login = async (
  email: string = DATABRARY_EMAIL,
  password: string = DATABRARY_PASSWORD,
  superuser = false
) => {
  const response = await axiosInstance.post('/user/login', {
    email,
    password,
    superuser,
  });

  // csverf = response.data.csverf;
  const cookies = parseSetCookie(response);
  cookies.forEach((c: Cookies) => {
    session.defaultSession.cookies.set({ ...c, url: DATABRARY_API_URL });
  });
  session.defaultSession.cookies.get({}).then(console.log).catch(console.log);

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
