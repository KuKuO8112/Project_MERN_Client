import axios from "axios";
const API_URL = "https://project-mern-server.onrender.com/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "/register", { username, email, password });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getTestAPI() {
    return axios.get(API_URL + "/testAPI");
  }
}

export default new AuthService();
