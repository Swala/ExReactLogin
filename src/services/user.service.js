import axios from "axios";
import AuthService from "./auth.service";
//import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/test/";

const user = AuthService.getCurrentUser();

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  //return axios.get(API_URL + "user", { headers: authHeader() });
  return axios.get(API_URL + "user");
};

/*
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};*/

const getAdminBoard = () => {
  console.log(user.accessToken);
  //return axios.get(API_URL + "admin", { headers: authHeader() });
  return axios.get(API_URL + "admin"); //HttpOnly cookies will automatically be sent along with requests
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  //getModeratorBoard,
};

export default UserService;
