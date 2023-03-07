import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import "./assets/main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

app.use(createPinia());
app.use(router);
app.mount("#app");
