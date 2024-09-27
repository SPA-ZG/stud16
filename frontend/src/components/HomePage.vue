<template>
   <div class="home-container">
      <div class="welcome-message">
         <h1>{{ pageTitle }}</h1>
         <p>Feel free to click on Movies to explore a list of movies, or click on Shows to discover a collection of shows.
         </p>
         <p>You can also express your liking by clicking the heart icon next to each item.</p>
         <p>Feel free to leave a comment.</p>
      </div>
   </div>
</template>
 
<style scoped>
.home-container {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 80vh;
}

.welcome-message {
   text-align: center;
}
</style>
 
<script>
export default {
   props: {
      pageTitle: {
         type: String,
         default: "Welcome!",
      },
   },
};
</script>
 