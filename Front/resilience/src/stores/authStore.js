import { defineStore } from "pinia";

export const authStore = defineStore({
  id: "auth",
  state: () => ({
    token: "",
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    getToken() {
      return this.token;
    },
  },
});
