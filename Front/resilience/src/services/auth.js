import instance from "./api";
const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
  login(username, password) {
    username = username + "@resilience.local";
    localStorage.setItem("password", password);
    return instance
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
        }
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        localStorage.removeItem("password");
        console.error(err);
      });
  }

  logout() {
    return instance.get(API_URL + "logout").then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      console.log(response.data);
      return response.data;
    });
  }
}

export default new AuthService();
