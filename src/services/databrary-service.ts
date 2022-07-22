import axios from 'axios';
import { parse as parseSetCookie } from 'set-cookie-parser';
import { session } from 'electron';
import envVariables from '../../env.json';

const { DATABRARY_API_URL, DATABRARY_EMAIL, DATABRARY_PASSWORD } = envVariables;
// eslint-disable-next-line prefer-const
let axiosInstance = axios.create({
  baseURL: DATABRARY_API_URL,
  withCredentials: true,
});

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
  return response.data;
};

const getVolumeInfo = async (volumeId: string): Promise<IVolume> => {
  const response = await axiosInstance.get(`/volume/${volumeId}`);
  console.log(response);
  return response.data;
};

export { login, getVolumeInfo };
