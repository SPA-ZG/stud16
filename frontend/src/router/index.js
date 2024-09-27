import { createRouter, createWebHistory } from "vue-router";
import MoviesList from "../components/MoviesList.vue";
import ShowsList from "../components/ShowsList.vue";
import HomePage from "../components/HomePage.vue";
import NotFoundPage from "../components/NotFoundPage.vue";


const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes: [
      {
         path: "/movies",
         name: "movies",
         component: MoviesList,
      },
      {
         path: "/shows",
         name: "shows",
         component: ShowsList,
      },
      {
         path: "/",
         name: "home",
         component: HomePage,
      },
      {
         path: "/:catchAll(.*)*",
         name: "NotFound",
         component: NotFoundPage,
      },
   ],
});
// Taken from: https: //jasonwatmore.com/post/2022/06/07/vue-3-redirect-to-login-page-if-unauthenticated
/*router.beforeEach(async (to) => {
   // redirect to login page if not logged in and trying to access a restricted page
   const publicPages = ["/login"];
   const authRequired = !publicPages.includes(to.path);
   const auth = useAuthStore();

   if (authRequired && !auth.isAuthenticated) {
      auth.setLandingUrl(to.fullPath);
      return "/login";
   }
});*/

export default router;
