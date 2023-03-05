<script>
import { defineComponent } from "vue";
import NavBar from "@/components/NavbarComponent.vue";
import { mapStores } from "pinia";
import { authStore } from "@/stores/authStore";

export default defineComponent({
  components: { NavBar },
  computed: {
    ...mapStores(authStore),
  },
});
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
