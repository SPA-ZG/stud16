<template>
  <div class="main-container">
    <nav class="title-container">
      <img src="../assets/title.png" class="title-image" />
    </nav>
    <ul class="movie-list" v-if="popularMovies.length > 0">
      <li v-for="movie in popularMovies" :key="movie.id" class="movie-item">
        <div class="movie-box">
          <h2 class="movie-title">{{ movie.movie_name }}</h2>
          <img :src="movie.image" class="movie-image" />
          <div class="like-container">
            <button @click="likeMovie(movie.id)" class="like-button">
              ❤️
            </button>
            <span class="like-count">{{ movie.likes || 0 }}</span>
          </div>
          <div>
            <h3>Comments:</h3>

      <li v-for="(comment, index) in movie.comments" :key="index">{{ comment }}</li>

      <textarea v-model="newComments[movie.id]" placeholder="Write a comment"></textarea>
      <button @click="addComment(movie.id)">Add Comment</button>
  </div>
  </div>
  </li>
  </ul>
  <div v-else class="no-movies-message">No movies available.</div>
  </div>
</template>

<style scoped>
.title-container {
  text-align: center;
}

.title-image {
  max-width: 100%;
}

.movie-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.movie-item {
  width: 250px;
  margin: 10px;
}

.movie-box {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s ease;
}

.movie-box:hover {
  transform: scale(1.1);
}

.movie-title {
  margin-bottom: 10px;
}

.movie-image {
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
  cursor: pointer;
  background: none;
  border: none;
  color: #ff0000;
  /* Heart color */
  font-size: 20px;
}

.like-button:hover {
  transform: scale(1.2);
}

.like-count {
  margin-left: 5px;
  font-size: 16px;
  color: #555;
}
</style>

<script>
import { ref, onMounted, computed } from "vue";
import { MoviesCollection } from "/src/main.js";
import { getDocs, updateDoc, doc, onSnapshot, arrayUnion } from "firebase/firestore";

export default {
  setup() {
    const movies = ref([]);
    const newComments = ref({});


    const likeMovie = async (movieId) => {
      const movieRef = doc(MoviesCollection, movieId);

      await updateDoc(movieRef, {
        likes: (movies.value.find((movie) => movie.id === movieId).likes || 0) + 1,
      });

      // Log a message after the update operation is complete
      console.log('Update operation completed');
    };
    onMounted(async () => {
      try {
        // Load movies from Firestore
        const snapshot = await getDocs(MoviesCollection);
        snapshot.forEach((doc) => {
          const movieData = doc.data();
          const movie = {
            ...movieData,
            id: doc.id,
          };
          movies.value.push(movie);
          // Initialize comments for each movie
          newComments.value[movie.id] = '';
        });

        // Set up real-time updates for likes and comments
        onSnapshot(MoviesCollection, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'modified') {
              const modifiedMovie = change.doc.data();
              const index = movies.value.findIndex((movie) => movie.id === change.doc.id);

              if (index !== -1) {
                // Update the local state with the modified movie data
                movies.value.splice(index, 1, { ...modifiedMovie, id: change.doc.id });
              }
            }
          });
        });
      } catch (error) {
        console.error("Error loading or updating movies:", error);
        // Handle the error
      }
    });

    const getComments = (movieId) => {
      return newComments.value[movieId] || [];
    };

    const addComment = async (movieId) => {
      const movieRef = doc(MoviesCollection, movieId);

      await updateDoc(movieRef, {
        comments: arrayUnion(newComments.value[movieId]),
      });

      // Clear the input after adding the comment
      newComments.value[movieId] = '';
    };

    const popularMovies = computed(() => {
      return movies.value.filter((movie) => movie.likes && movie.likes > 5);
    });


    return { movies, newComments, getComments, addComment, likeMovie, popularMovies };
  },
};
</script>