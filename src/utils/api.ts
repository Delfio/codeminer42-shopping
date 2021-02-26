import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://shielded-wildwood-82973.herokuapp.com/',
});

export default baseURL;
