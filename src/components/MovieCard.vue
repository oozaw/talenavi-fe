<script setup>
import { defineProps } from 'vue';

const props = defineProps({
   id: {
      type: Number,
      required: true
   },
   title: {
      type: String,
      required: true
   },
   director: {
      type: String,
      required: true
   },
   genres: {
      type: Array,
      required: true
   },
   description: {
      type: String,
      required: true
   }
});
</script>

<template>
   <div class="card p-4 rounded-lg border border-blue-500 cursor-pointer" @click="$router.push({ name: 'movie-detail', params: { id: id } })">
      <div class="text-left">
         <h3 class="text-lg text-left font-semibold">{{ title }}</h3>
         <span class="text-gray-500 text-sm">By: {{ director }}</span>
      </div>
      <hr class="my-2" />
      <div class="flex flex-wrap gap-1">
         <span v-for="(genre, index) in genres" :key="index" class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{{ genre.name }}</span>
      </div>
      <div class="mt-2">
         <p class="text-gray-500 text-left text-sm">{{ description }}</p>
      </div>
   </div>
</template>