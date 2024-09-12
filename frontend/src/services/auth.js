import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1/auth";

const login = async (body) => {
  return await axios.post(`${baseUrl}/login`, body);
};

const verifyToken = async (body) => {
  return await axios.post(`${baseUrl}/verifytoken`, body);
};

export default {
  login,
  verifyToken
};
