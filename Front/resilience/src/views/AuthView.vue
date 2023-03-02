<template>
  <div>
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username + "@resilience.local",
            password: this.password,
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          toast.success("Connexion établie avec succès");
        } else if (response.status === 401) {
          toast.error("Credentials incorrects");
        } else {
          toast.error("Erreur d'authentification, veuillez réessayer");
        }
        console.log(data.message); // Afficher un message de confirmation
      } catch (error) {
        console.error(error);
        // Afficher un message d'erreur à l'utilisateur
      }
    },
  },
};
</script>
