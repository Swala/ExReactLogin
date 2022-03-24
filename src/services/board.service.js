import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/";

const getFlags = () => {
  return axios.get(API_URL + "flag/all", { headers: authHeader() });
};

const getProjects = () => {
  return axios.get(API_URL + "project/all", { headers: authHeader() });
};

const BoardService = {
  getFlags,
  getProjects,
};

export default BoardService;
