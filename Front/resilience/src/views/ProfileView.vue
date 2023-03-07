<template>
  <div>
    <p>
      Bonjour
      {{ userInfos ? userInfos.data.givenName + " " + userInfos.data.sn : "" }}
    </p>
    <button @click.prevent="handleLogout">Se déconnecter</button>
  </div>
</template>

<script>
import auth from "@/services/auth";
import user from "@/services/user";
import router from "@/router";
import { useToast } from "vue-toastification";

const toast = useToast();
export default {
  name: "ProfileView",
  data() {
    return {
      sessionToken: "",
      userInfos: null,
    };
  },
  async created() {
    this.sessionToken = localStorage.getItem("token");
    if (this.sessionToken === "" || this.sessionToken == null) {
      return router.push("/login");
    }
    this.userInfos = await user
      .getUser()
      .then()
      .catch((error) => {
        console.error(error);
      });
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
