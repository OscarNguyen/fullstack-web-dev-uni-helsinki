import axios from 'axios';
const URL = 'http://localhost:3001/persons';

export const getAll = async () => {
  const response = axios.get(URL);
  const result = await response;
  return result.data;
};

export const create = async (person) => {
  const response = axios.post(URL, person);
  const result = await response;
  return result.data;
};

export const deleteService = (id) => {
  return axios.delete(`${URL}/${id}`);
};

export const update = async (id, person) => {
  if (id) {
    return axios.put(`${URL}/${id}`, person);
  }
};
