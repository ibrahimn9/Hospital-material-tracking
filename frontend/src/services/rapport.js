import axios from "axios";

const baseUrl = "http://192.168.1.102:3000/api/v1/rapports";

const createOne = async (body) => {
  return await axios.post(baseUrl, body);
};

const getAll = async () => {
  return await axios.get(baseUrl);
};

export default {
  createOne,
  getAll
};
