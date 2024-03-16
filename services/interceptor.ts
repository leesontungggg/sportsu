import axios from 'axios';
import {convertError} from './utils';
import {BASE_URL, SPORTMUNK_TOKEN} from '../config/config';

const newAxios = axios;

newAxios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = SPORTMUNK_TOKEN;
    config.headers['Access-Control-Allow-Credentials'] = true;
    config.headers['Access-Control-Allow-Methods'] =
      'GET,DELETE,PATCH,POST,PUT';
    config.headers['Access-Control-Allow-Headers'] =
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version';

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

newAxios.interceptors.response.use(
  (res): any => {
    if (res.data && res.data.errors) {
      const {message} = convertError(res.data);
      return Promise.reject({message});
    }

    return Promise.resolve({
      data: res.data,
      total: res.headers['x-wp-total'],
    });
  },
  err => {
    const response = err.response;

    if (response && response.status === 401) {
      return Promise.reject({
        status: 401,
        message: 'unauthorized',
      });
    }

    return Promise.reject(response ? response.data : err);
  },
);

export default newAxios;
