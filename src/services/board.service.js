import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/flag/";

const getFlags = () => {
  return axios.get(API_URL + "all", { headers: authHeader() });
};

const BoardService = {
  getFlags,
};

export default BoardService;
