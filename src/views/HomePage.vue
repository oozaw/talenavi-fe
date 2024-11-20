<script setup>
import MovieCard from "@/components/MovieCard.vue";
import { ref } from "vue";
import { mapActions, mapState } from "pinia";
import { useMovieStore } from "@/stores";
import { onMounted } from "vue";

const movieStore = useMovieStore();

const keyword = ref("");
const movies = ref(movieStore.g$movies);

const searchMovies = async () => {
   try {
      movies.value = await movieStore.a$searchMovies(keyword.value);
   } catch (error) {
      movies.value = [];
      console.error(error);
   }
};

const getAllMovies = async () => {
   try {
      movies.value = await movieStore.a$getAllMovies();
   } catch (error) {
      movies.value = [];
      console.error(error);
   }
};

onMounted(async () => {
   await getAllMovies();
});
</script>

<template>
   <div>
      <div class="w-full">
         <input
            class="py-3 px-4 border border-slate-500 rounded-lg w-full"
            type="text"
            placeholder="Search by title"
            v-model="keyword"
            @input="searchMovies"
         />
         <!-- <button class="">Search</button> -->
      </div>
      <div class="mt-3">
         <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
         >
            <MovieCard
               v-for="movie in movies"
               :key="1"
               :id="movie.id"
               :title="movie.title"
               :director="movie.director"
               :genres="movie.genres"
               :description="movie.summary"
            />
         </div>

         <div v-if="!movies || movies.length == 0" class="text-center mt-3">
            <p>No movies found</p>
         </div>

         <router-link to="/movie/add">
            <button class="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white py-3 px-3 rounded-full">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
               </svg>
            </button>
         </router-link>
      </div>
   </div>
</template>
