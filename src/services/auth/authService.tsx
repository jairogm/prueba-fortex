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
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const currentUser =
    localStorage.getItem("user") != null &&
    JSON.parse(localStorage.getItem("user") || "");
  return currentUser;
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
