// src/stores/shows.js
import { defineStore } from 'pinia';
import { getDocs, updateDoc, doc, onSnapshot, arrayUnion } from 'firebase/firestore';
import { ShowsCollection } from '/src/main.js';

export const useShowsStore = defineStore('shows', {
   state: () => ({
      shows: [],
      newComments: {},
   }),

   actions: {
      async fetchShows() {
         try {
            const snapshot = await getDocs(ShowsCollection);
            snapshot.forEach((doc) => {
               const showData = doc.data();
               const show = {
                  ...showData,
                  id: doc.id,
               };
               this.shows.push(show);
               this.newComments[show.id] = '';
            });

            onSnapshot(ShowsCollection, (snapshot) => {
               snapshot.docChanges().forEach((change) => {
                  if (change.type === 'modified') {
                     const modifiedShow = change.doc.data();
                     const index = this.shows.findIndex((show) => show.id === change.doc.id);

                     if (index !== -1) {
                        this.shows.splice(index, 1, { ...modifiedShow, id: change.doc.id });
                     }
                  }
               });
            });
         } catch (error) {
            console.error('Error loading or updating shows:', error);
         }
      },

      async likeShow(showId) {
         const showRef = doc(ShowsCollection, showId);

         await updateDoc(showRef, {
            likes: (this.shows.find((show) => show.id === showId).likes || 0) + 1,
         });

         console.log('Update operation completed');
      },

      async addComment(showId) {
         const showRef = doc(ShowsCollection, showId);

         await updateDoc(showRef, {
            comments: arrayUnion(this.newComments[showId]),
         });

         this.newComments[showId] = '';
      },
   },
});

