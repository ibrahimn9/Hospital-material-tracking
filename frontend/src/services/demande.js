import axios from "axios";

const baseUrl = "http://192.168.1.102:3000/api/v1/demandes";

// Create a new Demande
const createOne = async (body) => {
  return await axios.post(baseUrl, body);
};

// Get all Demandes
const getAll = async () => {
  return await axios.get(baseUrl);
};

// Get a single Demande by its ID
const getOneById = async (id) => {
  return await axios.get(`${baseUrl}/${id}`);
};

// Update an existing Demande by its ID
const updateOne = async (id, body) => {
  return await axios.put(`${baseUrl}/${id}`, body);
};

// Delete a Demande by its ID
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
