import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1/bureaux";

const createOne = async (body) => {
  return await axios.post(baseUrl, body);
};

const getAll = async () => {
  return await axios.get(baseUrl);
};

const getOneById = async (id) => {
  return await axios.get(`${baseUrl}/${id}`);
};

const updateOne = async (id, body) => {
  return await axios.put(`${baseUrl}/${id}`, body);
};

const deleteOne = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

export default {
  createOne,
  getAll,
  getOneById,
  updateOne,
  deleteOne,
};