import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://117.16.137.205:8080/api',
  timeout: 3000,
});

instance.interceptors.request.use((config) => {
  return config;
});

export const request = (config) => {
  return instance
    .request(config)
    .then((response) => response.data.result);
};

export default instance;