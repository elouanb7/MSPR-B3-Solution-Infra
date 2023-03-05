<template>
  <div>
    <p>{{ sessionToken }}</p>
    <button @click.prevent="handleLogout">Se déconnecter</button>
  </div>
</template>

<script>
import auth from "@/services/auth";
import router from "@/router";
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  name: "ProfileView",
  data() {
    return {
      sessionToken: "",
    };
  },
  created() {
    this.sessionToken = localStorage.getItem("token");
    if (this.sessionToken === "" || this.sessionToken == null) {
      router.push("/login");
    }
  },
  methods: {
    handleLogout() {
      auth
        .logout()
        .then(() => {
          toast.success("Déconnecté avec succès");
          router.push("/login");
        })
        .catch((error) => {
          toast.error("Erreur de déconnexion, veuillez réessayer");
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
