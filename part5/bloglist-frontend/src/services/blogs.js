import axios from 'axios'
const baseBlogURL = '/api/blogs'
const baseUserURL = '/api/users'

const getAll = () => {
  const request = axios.get(baseBlogURL)
  return request.then((response) => response.data)
}

const getByUser = async (userId) => {
  const result = await axios.get(`${baseUserURL}/${userId}`)
  return result.data.blogs
}

const postBlog = async (data, token) => {
  console.log(token)
  console.log(data)

  const result = await axios.post(baseBlogURL, data)
  return result.data
}

const updateBlog = async (blogId, data) => {
  const result = await axios.put(`${baseBlogURL}/${blogId}`, data)
  console.log(result)
  return result.data
}

const deleteBlog = async (blogId) => {
  const result = await axios.delete(`${baseBlogURL}/${blogId}`)
  return result.data
}

export default { getAll, getByUser, postBlog, updateBlog, deleteBlog }
