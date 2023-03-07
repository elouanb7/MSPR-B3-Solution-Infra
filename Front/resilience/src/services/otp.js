import instance from "./api";
import router from "@/router";
const API_URL = "http://localhost:3000/api/auth/";

class OtpService {
  otp(username, password, otpCode, remember) {
    username = localStorage.getItem("username");
    password = localStorage.getItem("password");
    return instance
      .post(API_URL + "otp", {
        username,
        password,
        otpCode,
        remember,
      })
      .then((response) => {
        localStorage.removeItem("password");
        console.log(response.data);
        return response.data;
      })
      .catch(() => {
        localStorage.removeItem("password");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        router.push("/login");
      });
  }
}
export default new OtpService();
