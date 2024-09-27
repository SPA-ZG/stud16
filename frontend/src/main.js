import { createApp } from 'vue';
import App from './App.vue';
import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import moviesList from "./components/MoviesList.vue";
import showsList from "./components/ShowsList.vue";
import homePage from "./components/HomePage.vue";
import { VueFire, VueFireAuth } from 'vuefire'
import router from "./router";
import { createPinia } from 'pinia';

const app = createApp(App);

//app.config.globalProperties.$axios = axios;
////app.config.globalProperties.$backendUrl = 'http://localhost:3000';

const firebaseConfig = {
   apiKey: "AIzaSyC06vGCSoH7MqGzfqN_bi20H4daT6FpzM4",
   authDomain: "web-project6.firebaseapp.com",
   projectId: "web-project6",
   storageBucket: "web-project6.appspot.com",
   messagingSenderId: "564402059517",
   appId: "1:564402059517:web:ccb2520ebc1ab00d0fa694",
   measurementId: "G-6FFDTJD8ZV"
};


export const firebaseApp = initializeApp(firebaseConfig);


app.use(VueFire, {
   // imported above but could also just be created here
   firebaseApp,
   modules: [
      // we will see other modules later on
      VueFireAuth(),
   ],
})
const db = getFirestore(firebaseApp);

export const MoviesCollection = collection(db, 'movies');
export const ShowsCollection = collection(db, 'shows');
export { db };


app.use(createPinia());
app.use(router);
app.component("moviesList", moviesList);
app.component("showsList", showsList);
app.component("homePage", homePage);
app.mount("#app");


export const dbRealtime = getDatabase(firebaseApp);

