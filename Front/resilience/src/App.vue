<script setup>
import NavBar from "@/components/NavbarComponent.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <component
    :is="'script'"
    type="application/javascript"
    src="https://kit.fontawesome.com/edc8d5fc95.js"
    crossorigin="anonymous"
  >
  </component>
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
