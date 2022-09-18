import axios from 'axios'

export const BACKEND_API = 'http://localhost:3001/anecdotes'


// export const fetchAll = async () => {
//   const response = await axios.get(BACKEND_API)
//   console.log(response.data)
//   return response.data
// }

// export const createNew = async (content) => {
//   const data = { votes: 0, content, id: getId() }

//   const response = await axios.post(BACKEND_API, data)
//   return response.data
// }