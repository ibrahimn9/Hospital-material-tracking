import axios from "axios";

const baseUrl = "http://192.168.1.102:3000/api/v1/auth";

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
