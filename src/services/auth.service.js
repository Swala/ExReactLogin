import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const config = {
  withCredentials: true,
};

const register = (username, email, password, firstName, lastName, roles) => {
  console.log(roles);
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    firstName,
    lastName,
    roles,
  });
};

const login = (username, password) => {
  return axios
    .post(
      API_URL + "signin",
      {
        username,
        password,
      },
      config
    )
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
