import axios from 'axios';

const apiPort = '4466';
const ip = '192.168.19.137';
const BASE_URL_LOCAL = `http://${ip}:${apiPort}/api`;

export const LoginPath = '/Login'


const apiClient = axios.create({
  baseURL: BASE_URL_LOCAL,
  timeout: 5000
});

export default apiClient;

const _get = (url, config = {}) => {
  return apiClient.get(url, config);
};

const _delete = (url, config = {}) => {
  return apiClient.delete(url, config);
};

const _put = (url, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

const _post = (url, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};


export { _get, _delete, _put, _post };