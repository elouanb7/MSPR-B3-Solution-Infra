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
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import auth from "../services/auth";
import router from "@/router";
const toast = useToast();

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      auth
        .login(this.username, this.password)
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

<style>
#loginContainer {
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
}
</style>
