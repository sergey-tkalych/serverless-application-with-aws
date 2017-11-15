import axios from 'axios';
import config from './config';

const HTTP = axios.create({
  baseURL: config.apiEndpoint,
});

export default HTTP;
