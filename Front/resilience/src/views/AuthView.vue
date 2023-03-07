<template>
  <div id="loginContainer">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin" id="loginForm">
      <div>
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="button-center">
        <button type="submit">Se connecter</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
const toast = useToast();
import auth from "../services/auth";
import router from "@/router";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
    this.sessionToken = localStorage.getItem("token");
    this.sessionPassword = localStorage.getItem("password");
    if (
      this.sessionToken !== "" &&
      this.sessionToken !== null &&
      (this.sessionPassword === null || this.sessionPassword === undefined)
    ) {
      return router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      auth
        .login(this.username, this.password)
        .then(() => {
          router.push("/login/otp");
        })
        .catch((error) => {
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
  color: #fff; /* Couleur blanche */
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3); /* Ombre de texte pour le rendre plus visible */
}

#loginForm {
  width: 700px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

#loginForm label {
  display: block;
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #3c4d6b;
}

#loginForm input[type="text"],
#loginForm input[type="password"] {
  padding: 10px;
  width: 60%;
  margin-bottom: 10px;
  font-size: 1.2em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#loginForm input[type="text"]:focus,
#loginForm input[type="password"]:focus {
  border-color: #3c4d6b;
}

#loginForm button[type="submit"] {
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

#loginForm button[type="submit"]:hover {
  background-color: green;
  align-items: center;
}

#loginForm div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1.2em;
  justify-content: space-between;
}
#loginForm div.button-center {
  justify-content: center;
}

#loginForm div label {
  margin-right: 10px;
  color: #3c4d6b;
}
</style>
