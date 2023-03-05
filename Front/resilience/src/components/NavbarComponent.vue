<template>
  <nav>
    <div id="left">
      <RouterLink to="/">Resilience</RouterLink>
    </div>
    <div id="center">
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/login">Mon compte</RouterLink>
    </div>
    <div id="right">
      <i class="fa-light fa-bell"></i>
      <!--      <RouterLink to="/inscription"-->
      <!--        ><i class="fa-light fa-user"></i-->
      <!--      ></RouterLink>-->
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
/* styles for larger screens */
@media (min-width: 768px) {
  nav {
    width: 100%;
    text-align: center;
    margin-top: 2rem;
    font-size: 18px;
    display: flex;
    justify-content: space-around;
  }

  #left {
    font-size: 25px;
    width: 10rem;
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  #right {
    width: 10rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  #center {
    display: flex;
    align-items: center;
  }
}
/* styles for smaller screens */
@media (max-width: 767px) {
  nav {
    flex-wrap: wrap;
  }

  #left,
  #right,
  #center {
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }

  #left {
    font-size: 20px;
  }

  #center {
    margin-top: 1rem;
  }
}
nav a.router-link-exact-active {
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  text-decoration: none;
}
nav a:first-of-type {
  border: 0;
}
</style>
