<script setup>
import { ref } from "vue";
import { mapActions, mapState } from "pinia";
import { useMovieStore, useGenreStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const movieStore = useMovieStore();
const genreStore = useGenreStore();

const routeName = route.name;

const title = ref("");
const director = ref("");
const summary = ref("");
const genres = ref([]);
const genresList = ref(genreStore.g$genres);

const getDetailMovie = async () => {
   try {
      const movie = await movieStore.a$getMovie(route.params.id);
      title.value = movie.title;
      director.value = movie.director;
      summary.value = movie.summary;
      genres.value = movie.genres.map((genre) => genre.id);
   } catch (error) {
      console.error(error);
   }
};

const addMovie = async () => {
   const addButton = document.getElementById("add-movie-button");
   addButton.disabled = true;
   addButton.innerText = "Adding...";

   try {
      await movieStore.a$createMovie({
         title: title.value,
         director: director.value,
         summary: summary.value,
         genres: genres.value,
      });

      alert("Movie added successfully");
      router.push({ name: "home" });
   } catch (error) {
      console.error(error);
      const message = error.response ? error.response.data.errors : error.message;
      alert("Failed to add movie, " + message);
   }

   addButton.disabled = false;
   addButton.innerText = "Add Movie";
};

const getAllGenres = async () => {
   try {
      genresList.value = await genreStore.a$getAllGenres();
   } catch (error) {
      console.error(error);
   }
};

const updateMovie = async () => {
   const updateButton = document.getElementById("update-movie-button");
   updateButton.disabled = true;
   updateButton.innerText = "Saving...";

   try {
      const data = {
         title: title.value,
         director: director.value,
         summary: summary.value,
         genres: genres.value,
      };

      await movieStore.a$updateMovie(route.params.id, data);
      alert("Movie updated successfully");
   } catch (error) {
      console.error(error);
      const message = error.response ? error.response.data.errors : error.message;
      alert("Failed to update movie, " + message);
   }

   updateButton.disabled = false;
   updateButton.innerText = "Save";
};

const deleteMovie = async () => {
   // alert with confirm
   const confirmDelete = confirm("Are you sure you want to delete this movie?");
   if (!confirmDelete) return;

   const deleteButton = document.getElementById("delete-movie-button");
   deleteButton.disabled = true;
   deleteButton.innerText = "Deleting...";

   try {
      await movieStore.a$deleteMovie(route.params.id);
      
      alert("Movie deleted successfully");
      router.push({ name: "home" });
   } catch (error) {
      console.error(error);
      alert("Failed to delete movie");
   }

   deleteButton.disabled = false;
   deleteButton.innerText = "Delete";
};

onMounted(() => {
   getAllGenres();
   if (routeName === "movie-detail") {
      getDetailMovie();
   }
});
</script>

<template>
   <div class="text-left mb-3">
      <h1 v-if="routeName == 'create-movie'" class="text-xl font-semibold">Add New Movie</h1>
      <h1 v-else class="text-xl font-semibold">Detail & Update Movie</h1>
   </div>
   <div class="w-full text-left">
      <label for="title" class="text-sm font-medium">Title</label>
      <input
         class="py-2 px-4 w-full text-sm border border-slate-500 rounded-lg"
         type="text"
         name="title"
         id="title"
         placeholder="Title"
         v-model="title"
      />
   </div>
   <div class="w-full mt-3 text-left">
      <label for="director" class="text-sm font-medium">Director</label>
      <input
         class="py-2 px-4 w-full text-sm border border-slate-500 rounded-lg"
         type="text"
         name="director"
         id="director"
         placeholder="Director name"
         v-model="director"
      />
   </div>
   <div class="w-full mt-3 text-left">
      <label for="summary" class="text-sm font-medium">Summary</label>
      <textarea
         class="py-2 px-4 w-full text-sm border border-slate-500 rounded-lg"
         name="summary"
         id="summary"
         rows="6"
         placeholder="Summary"
         v-model="summary"
      ></textarea>
   </div>
   <div class="w-full mt-3 text-left">
      <label for="genre" class="text-sm font-medium">Genre</label>
      <div class="grid grid-cols-2 gap-4">
         <div v-for="genre in genresList" :key="genre.id">
            <input
               type="checkbox"
               :value="genre.id"
               v-model="genres"
               :id="`genre-${genre.id}`"
               :checked="genres.includes(genre.id)"
            />
            <label :for="`genre-${genre.id}`">{{ genre.name }}</label>
         </div>
      </div>
   </div>
   <div class="w-full mt-3 text-left">
      <div
         v-if="routeName === 'movie-detail'"
         class="flex justify-end gap-2"
      >
         <button
            id="delete-movie-button"
            class="py-2 px-4 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
            @click="deleteMovie"
         >
            Delete
         </button>
         <button
            id="update-movie-button"
            class="py-2 px-4 text-sm bg-blue-700 hover:bg-blue-800 text-white rounded-lg"
            @click="updateMovie"
         >
            Save  
         </button>
      </div>
      <div
         v-else
         class="flex justify-end gap-2"
      >
         <button
            id="add-movie-button"
            class="py-2 px-4 text-sm bg-blue-700 hover:bg-blue-800 text-white rounded-lg"
            @click="addMovie"
         >
            Add Movie
         </button>
      </div>
   </div>
</template>
