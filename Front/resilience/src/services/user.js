import instance from "./api";

const API_URL = "http://localhost:3000/api/";

class UserService {
  async getUser() {
    return instance.get(API_URL + "user/" + localStorage.getItem("username"));
  }
}

export default new UserService();
