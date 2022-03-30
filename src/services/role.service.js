import axios from "axios";
//import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/roles/";

const getRoles = () => {
  //return axios.get(API_URL + "all", { headers: authHeader() });
  return axios.get(API_URL + "all");
};

const RoleService = {
  getRoles,
};
export default RoleService;
