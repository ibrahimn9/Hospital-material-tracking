import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1/material";

const createOne = async (body) => {
  return await axios.post(`${baseUrl}/materials`, body);
};

const getAll = async () => {
  return await axios.get(`${baseUrl}/materials`);
};

const getOneById = async (id) => {
  return await axios.get(`${baseUrl}/materials/${id}`);
};

const updateOne = async (id, body) => {
  return await axios.put(`${baseUrl}/materials/${id}`, body);
};

const deleteOne = async (id) => {
  return await axios.delete(`${baseUrl}/materials/${id}`);
};

export default {
  createOne,
  getAll,
  getOneById,
  updateOne,
  deleteOne,
};
