<template>
  <div id="loginContainer">
    <h2>Connexion avec OTP</h2>
    <form @submit.prevent="handleOtp" id="otpForm">
      <div>
        <label for="otpCode">6 digits code</label>
        <input type="text" id="otpCode" v-model="otpCode" required />
      </div>
      <div>
        <label for="remember">Se souvenir de cet ordinateur</label>
        <input type="checkbox" id="remember" v-model="remember" required />
      </div>
      <div class="button-center"><button type="submit">Vérifier</button></div>
    </form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import otp from "../services/otp";
import router from "@/router";
const toast = useToast();

export default {
  data() {
    return {
      username: "",
      password: "",
      otpCode: "",
      remember: false,
    };
  },
  created() {
    this.sessionToken = localStorage.getItem("token");
    this.sessionPassword = localStorage.getItem("password");
    if (
      this.sessionToken !== "" &&
      this.sessionToken !== null &&
      this.sessionPassword === null
    ) {
      return router.push("/profile");
    }
  },
  methods: {
    handleOtp() {
      otp
        .otp(this.username, this.password, this.otpCode, this.remember)
        .then(() => {
          toast.success("Connexion établie avec succès");
          router.push("/profile");
        })
        .catch((error) => {
          toast.error("Erreur d'authentification, veuillez réessayer");
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
/*#loginContainer {
  margin: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#loginForm,
#loginForm > div,
#loginForm > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}*/

#loginContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
}

#loginContainer h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
}

#otpForm {
  width: 600px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

#otpForm label {
  display: block;
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #3c4d6b;
}

#otpForm input[type="text"],
#otpForm input[type="password"],
#otpForm input[type="checkbox"] {
  padding: 10px;
  width: 50%;
  margin-bottom: 10px;
  font-size: 1.2em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#otpForm input[type="text"]:focus,
#otpForm input[type="password"]:focus {
  border-color: #3c4d6b;
}

#otpForm button[type="submit"] {
  background-color: green;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s ease;
}

#otpForm button[type="submit"]:hover {
  background-color: darkgreen;
}

#otpForm div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1.2em;
  justify-content: space-between;
}

#otpForm div.button-center {
  justify-content: center;
}

#otpForm div label {
  margin-right: 10px;
  color: #3c4d6b;
}
</style>
