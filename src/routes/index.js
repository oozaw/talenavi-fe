import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/HomePage.vue';
import CreateMovie from '@/views/CreateMovie.vue';

const routes = [
   {
      path: '/',
      name: 'home',
      component: Home
   },
   {
      path: '/movie/add',
      name: 'create-movie',
      component: CreateMovie
   },
   {
      path: '/movie/:id',
      name: 'movie-detail',
      component: CreateMovie
   }
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

export default router;