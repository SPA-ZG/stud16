<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/movies" class="router-link">Movies</RouterLink>
        <RouterLink to="/shows" class="router-link">Shows</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
.router-link {
  margin-right: 20px; /* Prilagodite željeni razmak između ruta */
}
</style>
