import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

/*import vue3GoogleLogin from "vue3-google-login";*/

import "./assets/main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

/*
app.use(vue3GoogleLogin, {
  clientId: "YOUR_GOOGLE_CLIENT_ID",
});
*/

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});
app.use(createPinia());
app.use(router);
app.mount("#app");
