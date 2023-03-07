<template>
  <div>
    <div class="user-info">
      <h2>
        Bonjour
        {{
          userInfos ? userInfos.data.givenName + " " + userInfos.data.sn : ""
        }}
      </h2>
      <ul>
        <li>
          <strong>Nom d'utilisateur :</strong>
          {{ userInfos ? userInfos.data.sAMAccountName : " " }}
        </li>
        <li>
          <strong>Adresse e-mail :</strong>
          {{ userInfos ? userInfos.data.userPrincipalName : " " }}
        </li>
        <li>
          <strong>Date de création :</strong>
          {{ userInfos ? userInfos.data.whenCreated : " " }}
        </li>
        <li>
          <strong>Dernière mise à jour du mot de passe :</strong>
          {{ userInfos ? userInfos.data.pwdLastSet : " " }}
        </li>
      </ul>
    </div>
    <div class="button-center">
      <button @click.prevent="handleLogout">Se déconnecter</button>
    </div>
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
