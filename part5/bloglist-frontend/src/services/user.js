import axios from 'axios';
const baseURL = '/api/users';

const login = async (userData) => {
  const user = await axios.post(`${baseURL}/login`, userData);
  return user;
};

export default { login };
