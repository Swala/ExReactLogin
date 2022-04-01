import axios from "axios";
//import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/";
const config = {
  withCredentials: true,
};

const getProject = (id) => {
  //return axios.get(API_URL + "project/all", { headers: authHeader() });
  console.log(id);
  return axios.get(API_URL + "project/" + id, config);
};

const ProjectService = {
  getProject,
};

export default ProjectService;
