import instance from "./api";
import { authStore } from "@/stores/authStore";

const API_URL = "http://localhost:3000/";

class AuthService {
  store = authStore();
  login(username, password) {
    username = username + "@resilience.local";
    return instance
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        console.log(response.data);
        return response.data;
      });
  }

  logout() {
    return instance.get(API_URL + "logout", {}).then((response) => {
      localStorage.removeItem("token");
      console.log(response.data);
      return response.data;
    });
  }
}

export default new AuthService();
