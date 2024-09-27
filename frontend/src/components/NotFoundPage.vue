<template>
   <div class="not-found-container">
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <router-link to="/">Go to Home</router-link>
   </div>
</template>
 
<style scoped>
.not-found-container {
   text-align: center;
   margin-top: 50px;
}

h1 {
   font-size: 3em;
   color: #f00;
}

p {
   font-size: 1.2em;
   color: #555;
   margin-bottom: 20px;
}

router-link {
   color: #00f;
   font-weight: bold;
   text-decoration: underline;
}
</style>
 
<script>
export default {
   name: 'NotFound',
};
</script>
 