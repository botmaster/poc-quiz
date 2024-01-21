import { createApp } from 'vue';
import './assets/styles/main.scss';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue';
import router from './router';
import App from './App.vue';
import prettyConsole from '@/plugins/pretty-console';
import i18n from '@/plugins/i18n';

const app = createApp(App);

app.use(prettyConsole);
app.use(router);
app.use(createPinia());
app.use(i18n);
app.use(createHead());

app.mount('#app');
