import axios from "axios";
//import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/";
const config = {
  withCredentials: true,
};

const getFlags = () => {
  //return axios.get(API_URL + "flag/all", { headers: authHeader() }); //When using header to store JWT
  return axios.get(API_URL + "flag/all", config);
};

const getProjects = () => {
  //return axios.get(API_URL + "project/all", { headers: authHeader() });
  return axios.get(API_URL + "project/all", config);
};

const BoardService = {
  getFlags,
  getProjects,
};

export default BoardService;
