<script>
import { defineComponent } from "vue";
import NavBar from "@/components/NavbarComponent.vue";
import { RouterView } from "vue-router";

export default defineComponent({
  components: { NavBar },
});
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
