<template>
  <div class="main-container">
    <nav class="title-container">
      <img src="../assets/showTitle.png" class="title-image" />
    </nav>
    <ul class="show-list" v-if="shows.length > 0">
      <li v-for="show in shows" :key="show.id" class="show-item">
        <div class="show-box">
          <h2 class="show-title">{{ show.show_name }}</h2>
          <img :src="show.image" class="show-image" />
          <div class="like-container">
            <button @click="likeShow(show.id)" class="like-button">
              ❤️
            </button>
            <span class="like-count">{{ show.likes || 0 }}</span>
          </div>
          <div class="comments-container">
            <h3>Comments:</h3>
      <li v-for="(comment, index) in show.comments" :key="index">{{ comment }}</li>
      <textarea v-model="newComments[show.id]" placeholder="Write a comment"></textarea>
      <button @click="addComment(show.id)">Add Comment</button>
  </div>

  </div>
  </li>
  </ul>
  <div v-else class="no-show-message">No shows available.</div>
  </div>
</template>

<style scoped>
.title-container {
  text-align: center;
}

.title-image {
  max-width: 100%;
}

.show-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.show-item {
  width: 250px;
  margin: 10px;
}

.show-box {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s ease;
}

.show-box:hover {
  transform: scale(1.1);
}

.show-title {
  margin-bottom: 10px;
}

.show-image {
  max-width: 100%;
  max-height: 150px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.like-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
}

.like-button {
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  color: #ff0000;
  font-size: 20px;
  transition: transform 0.3s ease;
}

.like-button:hover {
  transform: scale(1.2);
}

.like-count {
  margin-left: 5px;
  font-size: 16px;
  color: #555;
}

.comments-container {
  margin-top: 15px;
}

.comments-container ul {
  list-style: none;
  padding: 0;
}

.comments-container li {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

.comments-container {
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  /* Prilagodite ovisno o potrebama rasporeda */
  gap: 10px;
  /* Prilagodite razmak između komponenti prema potrebi */
  align-items: start;
  /* Postavite vertikalno poravnanje na vrh */
}

.comments-list {
  overflow-y: auto;
  /* Omogućava pomicanje ako ima previše komentara */
  max-height: 200px;
  /* Prilagodite maksimalnu visinu prema potrebi */
  margin: 0;
  /* Poništava ugrađeni margin od ul elementa */
  padding: 0;
  /* Poništava ugrađeni padding od ul elementa */
  list-style: none;
}

.comments-list li {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

textarea {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>

<script>
import { onMounted } from 'vue';
import { useShowsStore } from '/src/stores/showsStore';

export default {
  setup() {
    const { shows, newComments, likeShow, addComment, fetchShows } = useShowsStore();
    onMounted(fetchShows);


    const getComments = (showId) => newComments[showId] || [];

    return { shows, newComments, likeShow, addComment, getComments };
  },
};
</script>