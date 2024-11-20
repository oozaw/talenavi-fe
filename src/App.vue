<script setup>
import TopBar from '@/components/TopBar.vue';
import MovieCard from '@/components/MovieCard.vue';
</script>

<template>
  <div class="sticky top-0">
    <TopBar />
  </div>
  <div class="text-center pt-3 main-content">
    <router-view />
  </div>
</template>
