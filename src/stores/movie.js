import { defineStore } from "pinia";
import { axiosInstance } from "@/utils/axios";

export const useMovieStore = defineStore("movie", {
   state: () => ({
      movies: [],
      movie: {},
   }),
   actions: {  
      async a$getAllMovies() {
         try {
            const res = await axiosInstance.get("/movies");
            this.movies = res.data.data;
            return res.data.data;
         } catch (err) {
            if (err.response && err.response.status === 404) {
               this.movies = [];
            } else {
               throw err;
            }
         }
      },

      async a$getMovie(id) {
         try {
            const res = await axiosInstance.get(`/movies/${id}`);
            this.movie = res.data.data;
            return res.data.data;
         } catch (err) {
            if (err.response && err.response.status === 404) {
               this.movie = {};
            } else {
               throw err;
            }
         }
      },

      async a$searchMovies(keyword) {
         try {
            const res = await axiosInstance.get("/movies/search", { params: { keyword } });
            this.movies = res.data.data;
            return res.data.data;
         } catch (err) {
            if (err.response && err.response.status === 404) {
               this.movies = [];
            } else {
               throw err;
            }
         }
      },

      async a$createMovie(data) {
         try {
            const res = await axiosInstance.post("/movies", data);
            this.movie = res.data.data;
            return res.data.data;
         } catch (err) {
            throw err;
         }
      },

      async a$updateMovie(id, data) {
         try {
            const res = await axiosInstance.put(`/movies/${id}`, data);
            this.movie = res.data.data;
            return res.data.data;
         } catch (err) {
            throw err;
         }
      },

      async a$deleteMovie(id) {
         try {
            await axiosInstance.delete(`/movies/${id}`);
         } catch (err) {
            throw err;
         }
      },
   },
   getters: {
      g$movies: ({ movies }) => movies,
   },
});
