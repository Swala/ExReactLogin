import axios from "axios";
//import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/project/";
const config = {
  withCredentials: true,
};

const getProject = (id) => {
  //return axios.get(API_URL + "project/all", { headers: authHeader() });
  //console.log(id);
  return axios.get(API_URL + id, config);
};

const create = (name, deadline, description) => {
  console.log("in project service");
  return axios.post(
    API_URL + "create",
    {
      name,
      deadline,
      description,
    },
    config
  );
};

const deleteProject = (id) => {
  return axios.delete(API_URL + id, config);
};

const ProjectService = {
  getProject,
  create,
  deleteProject,
};

export default ProjectService;
