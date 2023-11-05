
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://47.128.71.161:3001/', 
//   headers: {
//     'Content-Type': 'application/json', // Set common headers
//   },
});

export default instance;
