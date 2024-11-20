import { defineStore } from "pinia";
import { axiosInstance } from "@/utils/axios";

export const useGenreStore = defineStore("genre", {
   state: () => ({
      genres: [],
      genre: {},
   }),
   actions: {  
      async a$getAllGenres() {
         try {
            const res = await axiosInstance.get("/genres");
            this.genres = res.data.data;
            return res.data.data;
         } catch (err) {
            throw err;
         }
      },
   },
   getters: {
      g$genres: ({ genres }) => genres,
   },
});
