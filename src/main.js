import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import router from './routes';

import './index.css';
import './style.css';

const pinia = createPinia();
// pinia.use(piniaPluginPersistedState);

const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount('#app');
