import axios from 'axios';
const baseBlogURL = '/api/blogs';
const baseUserURL = '/api/users';

const getAll = () => {
  const request = axios.get(baseBlogURL);
  return request.then((response) => response.data);
};

const getByUser = async (userId) => {
  const result = await axios.get(`${baseUserURL}/${userId}`);
  return result.data.blogs;
};

const postBlog = async (data, token) => {
  console.log(token);
  console.log(data);

  const result = await axios.post(baseBlogURL, data);
  return result.data;
};

export default { getAll, getByUser, postBlog };
