import instance from "./api";
import router from "@/router";
import { useToast } from "vue-toastification";
const toast = useToast();
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
        toast.success("Connexion établie avec succès");
        return response.data;
      })
      .catch(() => {
        localStorage.removeItem("password");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        toast.error("Erreur d'authentification, veuillez réessayer");
        router.push("/login");
      });
  }
}
export default new OtpService();
