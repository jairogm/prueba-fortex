//axios
import axios from "axios";

//types
import { User } from "../../Types.d";

const API_URL = "https://demo-api-work-test.herokuapp.com";

const login = (email: User["email"], password: User["password"]) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  const currentUser =
    localStorage.getItem("token") != null &&
    JSON.parse(localStorage.getItem("token") || "{}");
  return currentUser;
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
